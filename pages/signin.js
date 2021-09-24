import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useSignIn } from "hooks/user";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

function SigninPage() {
  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("Alice123");
  const { SignInLoading, SignInError, SignIn } = useSignIn();

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = await SignIn(email, password);
    if (valid) router.push("/");
  };
  return (
    <Layout title="Signin Page">
      <Title>Sign-in</Title>
      <div className="grid grid-cols-1 place-items-center ">
        <div className=" w-full md:w-6/12 lg:w-4/12  ">
          <form onSubmit={handleSubmit}>
            <Label label="Email address" htmlFor="email">
              <Input
                value={email}
                required
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
              />
            </Label>
            <Label label="Password" htmlFor="password">
              <Input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
              />
            </Label>
            {SignInError && (
              <p className="text-red-600 text-center">Invaid credentials!</p>
            )}
            {SignInLoading ? (
              <p className="text-center mt-8">Loading</p>
            ) : (
              <Button type="submit" onSubmit={(e) => handleSubmit(e)}>
                Login
              </Button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default SigninPage;
