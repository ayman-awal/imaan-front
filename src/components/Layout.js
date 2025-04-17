import Appbar from "@/components/Appbar";

export default function Layout({ children }) {
  return (
    <>
      <Appbar />
      <main>{children}</main>
    </>
  );
}
