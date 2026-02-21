const { Client, Databases, ID } = Appwrite;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("699951780025ec313cb6");

const databases = new Databases(client);

// ---------- FORM SUBMIT ----------
const form = document.getElementById("memberForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const city = document.getElementById("city").value;

    try {
      await databases.createDocument(
        "699955b1002b332e64c6", // Database ID
        "members",            // Table ID
        ID.unique(),
        {
          name: name,
          mobile: mobile,
          city: city
        }
      );

      alert("સભ્ય સફળતાપૂર્વક ઉમેરાયો ✅");
      form.reset();

    } catch (error) {
      alert("Error: " + error.message);
      console.error(error);
    }
  });
}