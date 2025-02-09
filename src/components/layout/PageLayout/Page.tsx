import Header from "./Header";
import Main from "./Main";

type PageProps = {
  title: string;
  children: React.ReactNode;
};

export function Page({ title, children }: PageProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header>{title}</Header>
      <Main >{children}</Main>
    </div>
  );
}
