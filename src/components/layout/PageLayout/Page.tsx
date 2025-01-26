import Main from "./Main";
import Header from "./Header";

type PageProps = {
  title: string;
  children: React.ReactNode;
};

export function Page({ title, children }: PageProps) {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <Header>{title}</Header>
      <Main>{children}</Main>
    </div>
  );
}
