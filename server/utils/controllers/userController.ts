import { User } from "../models/userModel";
import { authenticate } from "../tools/auth";
import jwt from "jsonwebtoken";

export const createUser = async (body: any) => {
  try {
    const data = await User.create({
      username: body.username,
      email: body.email,
      password: body.password,
      role: "User",
    });
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 500 });
  }
};

export const getUser = async () => {
  try {
    const data = await User.find({});
    if (!data)
      return new Response(JSON.stringify({ error: "No users found" }), {
        status: 404,
      });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify(e), { status: 500 });
  }
};

export const login = async (body: any) => {
  const config = useRuntimeConfig();
  const secret = config.secret as string;
  try {
    const user = await User.findOne({ email: body.email });
    if (!user)
      return new Response(JSON.stringify({ error: "No user found" }), {
        status: 404,
      });
    const authenticated = await authenticate(
      body.password,
      user.encrypted_password
    );

    if (authenticated) {
      try {
        const token = jwt.sign({ _id: user._id }, secret);
        return new Response(
          JSON.stringify({
            message: "Login successful",
            user: user,
            token: token,
            secret: secret,
          }),
          {
            status: 200,
            headers: {
              "Set-Cookie": `token=${token}; HttpOnly; Path=/; SameSite=Strict; Secure; Max-Age=2592000; `,
            },
          }
        );
      } catch (e) {
        return new Response(
          JSON.stringify({ error: e, message: "Internal Server Error" }),
          { status: 500 }
        );
      }
    }
    return new Response(
      JSON.stringify({
        error: "Invalid credentials",
        message: "Invalid credentials",
      }),
      {
        status: 401,
      }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};

export const logout = async () => {
  return new Response(JSON.stringify({ message: "Logout successful" }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=; HttpOnly; Path=/; SameSite=Strict; Secure; Max-Age=0; `,
    },
  });
};
