type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="h-full flex items-center justify-center px-4 md:px-0">
      <div className="md:h-auto md:w-[420px]">{children}</div>
    </div>
  );
}
