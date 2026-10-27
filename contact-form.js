import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

const form = document.querySelector("#contact-form");
const status = document.querySelector("#contact-form-status");
const submitButton = document.querySelector("#contact-form-submit");

if (form && status && submitButton) {
    if (!isFirebaseConfigured) {
        form.addEventListener("submit", event => {
            event.preventDefault();
            status.textContent = "Contact form is temporarily unavailable. Please email me directly.";
        });
    } else {
        const app = initializeApp(firebaseConfig);
        const database = getFirestore(app);

        form.addEventListener("submit", async event => {
            event.preventDefault();
            if (!form.reportValidity()) {
                return;
            }

            const formData = new FormData(form);
            const submission = {
                name: String(formData.get("name")).trim(),
                email: String(formData.get("email")).trim(),
                subject: String(formData.get("subject")).trim(),
                message: String(formData.get("message")).trim(),
                status: "unread",
                createdAt: serverTimestamp()
            };

            if (Object.values(submission).some(value => typeof value === "string" && !value)) {
                status.textContent = "Please complete every field before submitting.";
                return;
            }

            submitButton.disabled = true;
            status.textContent = "Sending your message…";

            try {
                await addDoc(collection(database, "contactSubmissions"), submission);
                form.reset();
                status.textContent = "Thanks! Your message has been sent successfully.";
            } catch (error) {
                console.error("Unable to submit the contact form.", error);
                status.textContent = "Your message could not be sent. Please try again or email me directly.";
            } finally {
                submitButton.disabled = false;
            }
        });
    }
}
