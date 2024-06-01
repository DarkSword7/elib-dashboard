import useTokenStore from "@/Store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  // Mutations
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      // Invalidate and refetch
      console.log("Register Success");
      setToken(response.data.accessToken);
      navigate("/dashboard/home");
    },
  });

  const handleRegisterSubmit = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !email || !password) {
      return;
    }

    console.log({ name, email, password });
    // make a request to the server to login
    mutation.mutate({ name, email, password });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      {" "}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
            {mutation.isPending && <div>Loading...</div>}
            {mutation.isError && (
              <div className="text-red-500 text-sm">
                all fields are required
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Name</Label>
              <Input ref={nameRef} id="first-name" placeholder="Max" required />
            </div>
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
              <Input ref={passwordRef} id="password" type="password" />
            </div>
            <Button
              onClick={handleRegisterSubmit}
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              <LoaderCircle
                className={mutation.isPending ? "animate-spin" : "hidden"}
              />
              <span>Create an account</span>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/auth/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
