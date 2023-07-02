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

        // Function to Detect Skin Disease
        function detectSkinDisease() {
          const uploadInput = document.getElementById('uploadInput');
          const resultElement = document.getElementById('result');

          const uploadedImage = uploadInput.files[0];
          if (uploadedImage) {
            const processedImage = processImage(uploadedImage);

            const detectedDisease = performDetection(processedImage, model, dataset); // Call your detection function here

            resultElement.textContent = `Penyakit kulit tersebut adalah : ${detectedDisease}`;
          } else {
            resultElement.textContent = 'No image uploaded.';
          }
        }

        // Function to Perform Detection
        function performDetection(image, model, dataset) {
          // Implement your detection logic using McCulloch-Pitts model and dataset here
          // Return the detected disease label based on the input image

          const threshold = 0.5; // Threshold for activation

          // Perform McCulloch-Pitts detection
          for (const data of dataset) {
            const imageData = processImage(new Image(data.image));
            const activation = calculateActivation(imageData, model);

            if (activation >= threshold) {
              return data.label; // Return the detected disease label
            }
          }

          return 'Unknown Disease'; // Return if no disease is detected
        }

        // Function to Calculate Activation
        function calculateActivation(imageData, model) {
          // Implement your McCulloch-Pitts activation logic here
          // Return the activation value for the given image and model

          // Example: Placeholder implementation
          return Math.random(); // Replace this with your actual activation calculation
        }

        // Event Listener for "Deteksi" Button
        const detectButton = document.getElementById('detectButton');
        detectButton.addEventListener('click', detectSkinDisease);
      })
      .catch(error => console.log('Error loading dataset JSON:', error));
  })
  .catch(error => console.log('Error loading model JSON:', error));
