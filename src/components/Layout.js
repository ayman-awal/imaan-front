import Appbar from "@/components/MenuAppbar";

export default function Layout({ children }) {
  return (
    <>
      <Appbar />
      <main>{children}</main>
    </>
  );
}
