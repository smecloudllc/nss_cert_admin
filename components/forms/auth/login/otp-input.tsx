"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

// import { useResendOtpStore, useWebTokenStore } from "@/store/auth";
import { UiButton, UiForm, UiOtpInput } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
// import { LoginServiceVerify } from "@/services/auth";
// import { useTempUserStore } from "@/store/tempUser";
import { setAuthCookies } from "@/app/auth/actions";
// import useResendOtp from "@/hooks/useResendOtp";
import { getDeviceInfo } from "@/lib/utils";
// import { useUserStore } from "@/store/user";
import { Loader2Icon } from "lucide-react";
// import { useRole } from "@/store/useRole";
import { routes } from "@/routes";

// This is for form schema
const formSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  token: z.string().min(1, {
    message: "Token field is required",
  }),
  admin: z.boolean(),
});

export default function OtpInput() {
  /**
   * State variables
   */
  const [loading, setLoading] = useState(false);

  /**
   * Hooks
   */
  const router = useRouter();
  // const { tempUser } = useTempUserStore();
  // const freshTempUser = useTempUserStore.getState().tempUser;
  // const { setRole } = useRole();
  // const { setWebToken } = useWebTokenStore();
  // const { resendOtp, otpLoad, cooldown } = useResendOtp();
  // const { otpStore } = useResendOtpStore();
  // const { setUser } = useUserStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      code: "",
      token: "",
      admin: true,
    },
  });

  // Get Device Info
  const info = getDeviceInfo();

  // Handle submission
  const handleSubmit = async (formdata: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      // const response = await LoginServiceVerify({
      //   ...formdata,
      //   token: freshTempUser?.token || formdata.token, // Use fresh token
      //   device: `${info.device} - ${info.browser.name} - ${info.browser.version} - ${info.os}`,
      // });

      console.log("");
      // Set cookie only once
      // await setAuthCookies(response.info.token, response.info.role);

      // Update stores
      // setUser(response.info);
      // setWebToken(response.info.token);
      // setRole(response.info.role);
      toast.success("Login successful", {
        style: {
          backgroundColor: "#18464b",
          color: "white",
        },
      });

      // if (response.info.role === "writer") {
      //   router.push(routes.dashboard.contentManagement.blogs.index);
      // } else {
      //   router.push(routes.dashboard.overview);
      // }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col  gap-y-2 lg:w-100 w-88 ">
      <div className="space-y-2">
        <UiForm.Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col space-y-4"
          >
            <UiForm.FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <UiForm.FormItem className="flex flex-col items-center">
                  <UiForm.FormControl>
                    <UiOtpInput.InputOTP
                      maxLength={6}
                      pattern="^[0-9]+$"
                      {...field}
                    >
                      <div className="flex gap-2">
                        <UiOtpInput.InputOTPGroup>
                          <UiOtpInput.InputOTPSlot index={0} />
                        </UiOtpInput.InputOTPGroup>

                        <UiOtpInput.InputOTPGroup>
                          <UiOtpInput.InputOTPSlot index={1} />
                        </UiOtpInput.InputOTPGroup>

                        <UiOtpInput.InputOTPGroup>
                          <UiOtpInput.InputOTPSlot index={2} />
                        </UiOtpInput.InputOTPGroup>
                      </div>

                      <div className="flex items-center">
                        <span className="text-muted-foreground">-</span>
                      </div>

                      <div className="flex gap-2">
                        <UiOtpInput.InputOTPGroup>
                          <UiOtpInput.InputOTPSlot index={3} />
                        </UiOtpInput.InputOTPGroup>

                        <UiOtpInput.InputOTPGroup>
                          <UiOtpInput.InputOTPSlot index={4} />
                        </UiOtpInput.InputOTPGroup>

                        <UiOtpInput.InputOTPGroup>
                          <UiOtpInput.InputOTPSlot index={5} />
                        </UiOtpInput.InputOTPGroup>
                      </div>
                    </UiOtpInput.InputOTP>
                  </UiForm.FormControl>

                  <UiForm.FormMessage />
                </UiForm.FormItem>
              )}
            />

            <UiButton.Button
              type="submit"
              className="h-12 mt-3 rounded-full dark:text-white bg-brand-primary font-semibold disabled:bg-brand-secondary hover:bg-brand-primary/50"
              disabled={
                loading ||
                !form.formState.isDirty ||
                form.formState.isSubmitting
              }
            >
              {loading ? <Loader2Icon className="animate-spin" /> : "Proceed"}
            </UiButton.Button>

            {/* Initiate resend otp service here */}

            {/* {cooldown > 0 ? (
              <p className="text-center text-sm font-medium">
                Wait {`${Math.floor(cooldown / 60)}`}:
                {String(cooldown % 60).padStart(2, "0")}
              </p>
            ) : (
              <div className="text-center text-sm mt-2">
                Don&lsquo;t receive the mail?{" "}
                {otpStore && (
                  <UiButton.Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-brand-lime"
                    onClick={() => {
                      resendOtp(otpStore);
                    }}
                    disabled={cooldown > 0}
                  >
                    {otpLoad ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Click to resend"
                    )}
                  </UiButton.Button>
                )}
              </div>
            )} */}
          </form>
        </UiForm.Form>
      </div>
    </main>
  );
}
