const client = new Appwrite.Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('YOUR_PROJECT_ID');

const databases = new Appwrite.Databases(client);

const databaseId = "YOUR_DATABASE_ID";
const collectionId = "members";

function maskMobile(mobile) {
  return mobile.substring(0,2) + "xxxx" + mobile.substring(6);
}

async function loadMembers() {
  const response = await databases.listDocuments(databaseId, collectionId, [
    Appwrite.Query.equal("status", "approved")
  ]);

  let html = "";
  response.documents.forEach(doc => {
    html += `
      <div class="card">
        <h4>${doc.name}</h4>
        <p>${doc.profession}</p>
        <p>${doc.city}</p>
        <p>${maskMobile(doc.mobile)}</p>
      </div>
    `;
  });

  document.getElementById("memberList").innerHTML = html;
}

async function submitForm() {
  await databases.createDocument(
    databaseId,
    collectionId,
    Appwrite.ID.unique(),
    {
      name: document.getElementById("name").value,
      father_name: document.getElementById("father").value,
      category: document.getElementById("category").value,
      profession: document.getElementById("profession").value,
      mobile: document.getElementById("mobile").value,
      city: document.getElementById("city").value,
      status: "pending"
    }
  );
  alert("માહિતી સફળતાપૂર્વક મોકલાઈ!");
}

function adminLogin() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if(email === "erkirit.raval@gmail.com" && pass === "Admin@123") {
    alert("Login Success");
  } else {
    alert("Wrong Credentials");
  }
}

if(document.getElementById("memberList")) {
  loadMembers();
}