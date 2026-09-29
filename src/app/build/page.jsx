import { Suspense } from "react";
import Configurator from "./Configurator";
import styles from "./build.module.css";

export const metadata = {
  title: "Build Your Truck",
  description:
    "Design your Fjord F-100 Heritage in 3D. Choose paint, two-tone accents, wheels, stance, powertrain, interior and accessories, then add your build to the cart.",
  alternates: { canonical: "/build" },
};

export default function BuildPage() {
  return (
    <div className={styles.page}>
      <Suspense fallback={<div className={styles.pageLoading}>Loading configurator…</div>}>
        <Configurator />
      </Suspense>
    </div>
  );
}
