import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const settingsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

export interface SettingsFormProps {
  /** Initial values to populate the form with. */
  defaultValues?: Partial<SettingsFormValues>;
  /**
   * Called with the validated form values on submit. Can be async
   * (e.g. an API call) — the submit button is disabled until it resolves.
   */
  onSave?: (values: SettingsFormValues) => Promise<void> | void;
}

export function SettingsForm({ defaultValues, onSave }: SettingsFormProps) {
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      email: defaultValues?.email ?? "",
    },
  });

  const onSubmit = async (values: SettingsFormValues) => {
    setSaveError(null);
    setSaveSuccess(false);
    try {
      await onSave?.(values);
      setSaveSuccess(true);
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "Something went wrong while saving. Please try again."
      );
    }
  };

  const fullNameErrorId = "fullName-error";
  const emailErrorId = "email-error";

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Profile settings"
    >
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          aria-invalid={errors.fullName ? "true" : "false"}
          aria-describedby={errors.fullName ? fullNameErrorId : undefined}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p id={fullNameErrorId} role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? emailErrorId : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id={emailErrorId} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {saveError && <p role="alert">{saveError}</p>}
      {saveSuccess && !isSubmitting && <p role="status">Profile saved successfully.</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}

export default SettingsForm;
