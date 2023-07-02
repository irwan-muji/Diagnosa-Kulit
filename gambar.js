function displayImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function() {
      const imageContainer = document.getElementById('imageContainer');
      const card = document.createElement('div');
      card.classList.add('card');
  
      const image = document.createElement('img');
      image.src = reader.result;
      card.appendChild(image);
  
      imageContainer.innerHTML = '';
      imageContainer.appendChild(card);
    };
  
    reader.readAsDataURL(file);
  }
  