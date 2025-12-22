"use client";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";

import { UiButton, UiForm, UiInput } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useTempUserStore } from "@/store/tempUser";
// import { useResendOtpStore } from "@/store/auth";
// import { LoginService } from "@/services/auth";

import { routes } from "@/routes";

// This is for form schema
const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username field is required",
  }),
});

export default function Login() {
  /**
   * State
   */
  const [loading, setLoading] = useState(false);

  /**
   * Hooks
   */
  const router = useRouter();
  // const { setTempUser } = useTempUserStore();
  // const { setOtpStore } = useResendOtpStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
    },
  });

  const handleSubmit = async (formdata: z.infer<typeof formSchema>) => {
    setLoading(true);

    // setOtpStore({
    //   admin: formdata.admin,
    //   device: `${deviceInfo.device} - ${deviceInfo.browser.name} - ${deviceInfo.browser.version} - ${deviceInfo.os}`,
    //   password: formdata.password,
    //   username: formdata.username,
    // });

    try {
      // const response = await LoginService({
      //   ...formdata,
      //   device: `${deviceInfo.device} - ${deviceInfo.browser.name} - ${deviceInfo.browser.version} - ${deviceInfo.os}`,
      // });

      // localStorage.setItem("temp-token", response.info.token);
      // setTempUser({
      //   username: formdata.username,
      //   token: response.info.token,
      //   two_factor: response.info.two_factor,
      // });
      console.log("");
      router.push(routes.auth.otp);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col mb-20 gap-y-2 lg:w-100 w-88 ">
      <div className="space-y-2">
        <UiForm.Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col space-y-4"
          >
            <UiForm.FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <UiForm.FormItem>
                  <UiForm.FormLabel className=" text-gray-500 text-sm">
                    Username
                  </UiForm.FormLabel>
                  <UiForm.FormControl>
                    <UiInput.Input
                      placeholder="Eg. realkelvinworld"
                      className=" py-6 px-4"
                      {...field}
                    />
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
              {loading ? <Loader2Icon className="animate-spin" /> : "Continue"}
            </UiButton.Button>
          </form>
        </UiForm.Form>
      </div>
    </main>
  );
}
