const { Client, Databases, ID } = Appwrite;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("699951780025ec313cb6");

const databases = new Databases(client);

// ----------- FORM SUBMIT -----------
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

// ----------- DISPLAY MEMBERS -----------
const memberList = document.getElementById("memberList");

if (memberList) {
  loadMembers();
}

async function loadMembers() {
  try {
    const response = await databases.listDocuments(
      "699955b1002b332e64c6",
      "members"
    );

    memberList.innerHTML = "";

    response.documents.forEach((doc) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>
          <strong>${doc.name}</strong><br>
          📞 ${doc.mobile}<br>
          📍 ${doc.city}
        </p>
        <hr>
      `;
      memberList.appendChild(div);
    });

  } catch (error) {
    console.error(error);
  }
}