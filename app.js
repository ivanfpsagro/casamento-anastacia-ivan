const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const uploadStatus = document.getElementById("uploadStatus");
const gallery = document.getElementById("gallery");

const CLOUDINARY_CLOUD_NAME = "devnzsfjg";
const CLOUDINARY_UPLOAD_PRESET = "casamento-ivan-anastacia";

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  if (!file) {
    uploadStatus.textContent = "Selecione um arquivo primeiro.";
    return;
  }

  uploadStatus.textContent = "🚀 Enviando imagem...";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_API_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      uploadStatus.textContent = "✅ Foto enviada com sucesso!";
      fileInput.value = "";

      const img = document.createElement("img");
      img.src = data.secure_url;
      img.style.width = "200px";
      img.style.margin = "10px";
      img.style.borderRadius = "10px";

      gallery.appendChild(img);

    } else {
      console.error("Erro Cloudinary:", data);
      uploadStatus.textContent = "❌ Erro ao enviar a imagem.";
    }

  } catch (error) {
    console.error(error);
    uploadStatus.textContent = "❌ Falha na conexão.";
  }
});
