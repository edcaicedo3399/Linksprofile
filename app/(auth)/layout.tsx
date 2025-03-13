export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 ">
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
      <div className="bg-[url('/bg-login.png')] bg-no-repeat bg-cover h-full w-full hidden md:block" />
    </div>
  );
}
