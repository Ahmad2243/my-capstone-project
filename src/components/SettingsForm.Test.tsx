import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import { SettingsForm } from "./SettingsForm";

describe("SettingsForm", () => {
  it("renders accessible fields with labels wired to their inputs", () => {
    render(<SettingsForm />);

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email");

    expect(nameInput).toHaveAttribute("id", "fullName");
    expect(emailInput).toHaveAttribute("id", "email");
    expect(nameInput).toHaveAttribute("aria-invalid", "false");
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
  });

  it("shows a validation error and sets aria-invalid when full name is too short", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText("Full Name"), "A");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    const error = await screen.findByText(/full name must be at least 2 characters/i);
    expect(error).toBeInTheDocument();

    const nameInput = screen.getByLabelText("Full Name");
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAttribute("aria-describedby", "fullName-error");
    expect(error).toHaveAttribute("id", "fullName-error");
  });

  it("shows a validation error and sets aria-invalid for an invalid email", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    const error = await screen.findByText(/enter a valid email address/i);
    expect(error).toBeInTheDocument();

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAttribute("aria-describedby", "email-error");
    expect(error).toHaveAttribute("id", "email-error");
  });

  it("does not call onSave when the form is invalid", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<SettingsForm onSave={onSave} />);

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    await screen.findByText(/full name must be at least 2 characters/i);
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave with the validated values on valid submit", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn().mockResolvedValue(undefined);
    render(<SettingsForm onSave={onSave} />);

    await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() =>
      expect(onSave).toHaveBeenCalledWith({
        fullName: "Jane Doe",
        email: "jane@example.com",
      })
    );
  });

  it("disables the submit button while saving and re-enables it after", async () => {
    const user = userEvent.setup();
    let resolveSave: () => void = () => {};
    const onSave = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSave = resolve;
        })
    );

    render(<SettingsForm onSave={onSave} />);

    await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => expect(submitButton).toBeDisabled());
    expect(submitButton).toHaveTextContent(/saving/i);

    resolveSave();

    await waitFor(() => expect(submitButton).not.toBeDisabled());
    expect(submitButton).toHaveTextContent(/save changes/i);
  });

  it("shows a save-failure message when onSave rejects", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn().mockRejectedValue(new Error("Network error"));
    render(<SettingsForm onSave={onSave} />);

    await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByRole("alert", { name: "" })).toHaveTextContent(/network error/i);
  });

  it("pre-fills fields from defaultValues", () => {
    render(
      <SettingsForm defaultValues={{ fullName: "Existing User", email: "existing@example.com" }} />
    );

    expect(screen.getByLabelText("Full Name")).toHaveValue("Existing User");
    expect(screen.getByLabelText("Email")).toHaveValue("existing@example.com");
  });
});
