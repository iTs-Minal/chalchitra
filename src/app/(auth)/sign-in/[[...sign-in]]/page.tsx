import { SignIn } from "@clerk/nextjs"

const Page = () => {
  return <SignIn forceRedirectUrl={"/home"}/>
}

export default Page
