import Welcome from "@/components/ui/welcome/welcome";

export default function Home() {
  return (
    <Welcome
      appName="tldraw-editor"
      author="Diego Estela"
      subtitle="Dibuja, edita y continúa donde lo dejaste"
      tone="brand"
      glow="on"
      align="center"
      size="lg"
      bg="halo"
    />
  );
}
