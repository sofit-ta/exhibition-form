import ContactForm from '@/components/ContactForm';
import styles from "@/styles/page.module.css";

export default function Home() {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <ContactForm />
        </div>
      </main>
    );
}
