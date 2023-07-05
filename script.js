// Load Model JSON
fetch('model.json')
  .then(response => response.json())
  .then(model => {
    // Load Dataset JSON
    fetch('dataset.json')
      .then(response => response.json())
      .then(dataset => {
        // Function to Process Uploaded Image
        function processImage(image) {
          // Implement image processing logic here (e.g., resizing, converting to grayscale)

          // Example: Assuming the images are located in the same directory as the HTML file
          const imagePath = image.name; // Use the name property of the uploaded image

          // Return processed image
          return imagePath;
        }

        // Function to Display Image
        function displayImage(event) {
          const imageContainer = document.getElementById('imageContainer');
          imageContainer.innerHTML = ''; // Clear previous image

          const file = event.target.files[0];
          const image = document.createElement('img');
          image.src = URL.createObjectURL(file);
          image.alt = 'Uploaded Image';

          imageContainer.appendChild(image);
        }

        // Function to Detect Skin Disease
        function detectSkinDisease() {
          const uploadInput = document.getElementById('uploadInput');
          const resultElement = document.getElementById('result');
          const explanationElement = document.getElementById('explanation');

          const uploadedImage = uploadInput.files[0];
          if (uploadedImage) {
            const processedImage = processImage(uploadedImage);

            const { detectedDisease, explanation } = performDetection(processedImage, model, dataset); // Call your detection function here

            resultElement.textContent = `Penyakit kulit tersebut adalah: ${detectedDisease}`;
            explanationElement.textContent = explanation;
          } else {
            resultElement.textContent = 'Tidak ada gambar yang diunggah.';
            explanationElement.textContent = '';
          }
        }

        // Function to Perform Detection
        function performDetection(image, model, dataset) {
          const threshold = 0.5; // Threshold for activation

          // Process image and calculate activation
          const processedImage = processImage(image);
          const activation = calculateActivation(processedImage, model);

          // Find the disease label with the highest activation
          let maxActivation = -Infinity;
          let detectedDisease = '';
          let explanation = '';

          for (const data of dataset) {
            if (activation[data.label] > maxActivation) {
              maxActivation = activation[data.label];
              detectedDisease = data.label;
              explanation = data.label2;
            }
          }

          if (maxActivation >= threshold) {
            return { detectedDisease, explanation };
          } else {
            return { detectedDisease: 'Gagal mendiagnosa', explanation: 'Pastikan foto dengan jelas!' };
          }
        }

        // Function to Calculate Activation
        function calculateActivation(imageData, model) {
          // Implement your activation calculation logic here
          // Return the activation values for the given image and model

          // Example: Placeholder implementation
          const activation = {};

          for (const label of model.labels) {
            activation[label] = Math.random(); // Replace this with your actual activation calculation
          }

          return activation;
        }

        // Event Listener for "Deteksi" Button
        const detectButton = document.getElementById('detectButton');
        detectButton.addEventListener('click', detectSkinDisease);
      })
      .catch(error => console.log('Error loading dataset JSON:', error));
  })
  .catch(error => console.log('Error loading model JSON:', error));
