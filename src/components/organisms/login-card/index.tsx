import { navigate } from "gatsby"
import { useAdminLogin } from "medusa-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../fundamentals/button"
import SigninInput from "../../molecules/input-signin"
import api from "../../../services/api" // Import your api.js file

type FormValues = {
  email: string
  password: string
}

type LoginCardProps = {
  toResetPassword: () => void
}

const LoginCard: React.FC<LoginCardProps> = ({ toResetPassword }) => {
  const [isInvalidLogin, setIsInvalidLogin] = useState(false)
  const { register, handleSubmit, reset } = useForm<FormValues>()
  const login = useAdminLogin()
  const onSubmit =  (values: FormValues) =>  {
    login.mutate(values, {
       onSuccess: async (login) => {
        console.log("login success")
        console.log("login.response.header", login.response.headers)
        try {
          const dataToken = await api.auth.token(values);
          const access_token = dataToken.data.access_token;
          console.log("access_token", dataToken.data.access_token)
          const cookieString = `token=${access_token}`;
          document.cookie = cookieString;

        } catch(err) {
          console.log("error")
        }
        // console.log(
        //   "login.response.header",
        //   login.response.headers["set-cookie"]
        // )
        navigate("/a/products")
      },
      onError: () => {
        console.log("error")
        setIsInvalidLogin(true)
        reset()
      },
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center">
        <span className="inter-2xlarge-semibold mt-4 text-grey-90">
          Welcome back!
        </span>
        <span className="inter-base-regular text-grey-50 mt-2">
          It's great to see you 👋🏼
        </span>
        <span className="inter-base-regular text-grey-50 mb-xlarge">
          Log in to your account below
        </span>
        <SigninInput
          placeholder="Email..."
          name="email"
          ref={register({ required: true })}
          autoComplete="email"
        />
        <SigninInput
          placeholder="Password..."
          type={"password"}
          name="password"
          ref={register({ required: true })}
          autoComplete="current-password"
        />
        {isInvalidLogin && (
          <span className="text-rose-50 w-full mt-2 inter-small-regular">
            These credentials do not match our records
          </span>
        )}
        <Button
          className="rounded-rounded mt-4 w-[320px] inter-base-regular"
          variant="primary"
          size="large"
          type="submit"
          loading={login.isLoading}
        >
          Continue
        </Button>
        <span
          className="inter-small-regular text-grey-50 mt-8 cursor-pointer"
          onClick={toResetPassword}
        >
          Reset password
        </span>
      </div>
    </form>
  )
}

export default LoginCard
