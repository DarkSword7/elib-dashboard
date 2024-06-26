import { Button } from "@/components/ui/button";
import { login } from "@/http/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import useTokenStore from "@/Store";

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  // Mutations
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      // Invalidate and refetch
      console.log("Login Success");
      setToken(response.data.accessToken);
      navigate("/dashboard/home");
    },
  });

  const handleLoginSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return;
    }

    console.log({ email, password });
    // make a request to the server to login
    mutation.mutate({ email, password });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
            {mutation.isPending && <div>Loading...</div>}
            {mutation.isError && (
              <div className="text-red-500 text-sm">
                username or password is incorrect
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef} id="password" type="password" required />
          </div>

          <Button
            onClick={handleLoginSubmit}
            className="w-full flex items-center gap-2"
            disabled={mutation.isPending}
          >
            <LoaderCircle
              className={mutation.isPending ? "animate-spin" : "hidden"}
            />
            <span>Sign in</span>
          </Button>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to={"/auth/register"} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
