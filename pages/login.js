import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, useSession, getProviders, signIn } from "next-auth/react";
import { Form, Input, Button, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export const getServerSideProps = async (context) => {
  // Redirect if user is already logged in
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const SignIn = () => {
  const { data: session, status } = useSession();
  const hasUser = !!session?.user;

  const [providers, setProviders] = useState({});

  useEffect(() => {
    const getProvidersFromNextAuth = async () => {
      const signInProviders = await getProviders();
      setProviders(signInProviders);
    };

    getProvidersFromNextAuth();
  }, [status, hasUser]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        className="rounded border border-gray-300 w-308 p-20"
        style={{ backgroundColor: "#F6F8FA" }}
      >
        <Form name="normal_login" initialValues={{ remember: true }}>
          <Form.Item name="username">
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              prefix={<LockOutlined />}
              size="large"
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="w-full"
            >
              Sign in
            </Button>
          </Form.Item>
          <Divider />
          {Object.values(providers).map((provider) => (
            // <div key={provider.name} className="bg-white">
            <Button
              key={provider.name}
              size="large"
              className="w-full"
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: `${window.location.origin}/home`,
                })
              }
            >
              Continue with {provider.name}
            </Button>
            // </div>
          ))}
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
