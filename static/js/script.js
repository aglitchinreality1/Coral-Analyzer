// funtion to change text inside div on button click
function changeText(divId, newText) {
    var myDiv = document.getElementById(divId);

    // Fade out the current text
    myDiv.style.opacity = 0;

    // Set a timeout to change the text and fade it in after 1 second
    setTimeout(function() {
      myDiv.innerHTML = newText;
      myDiv.style.opacity = 1;
    }, 600);
  }

  // Function to collapse navbar on any button click or touch outside the navbar
  document.addEventListener('DOMContentLoaded', function () {
    var navbarToggler = document.querySelector('.navbar-toggler');
    var navbarCollapse = document.querySelector('.navbar-collapse');
     // Collapse navbar on button click
    navbarToggler.addEventListener('click', function () {
        navbarCollapse.classList.toggle('show');
    });
     // Collapse navbar on any button click inside the navbar
    var navbarButtons = document.querySelectorAll('.navbar-nav .nav-link');
    navbarButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
     // Collapse navbar on touch outside the navbar, except when clicking a button inside the dropdown
    document.addEventListener('click', function (event) {
        if (!navbarToggler.contains(event.target) && !navbarCollapse.contains(event.target)) {
            navbarCollapse.classList.remove('show');
        }
    });
});



function fadeInImage(divId, newSrc) {
    var myImage = document.getElementById(divId);

    // Fade out the current image
    myImage.style.opacity = 0;

    // Set a timeout to change the image source and fade it in after 600 milliseconds
    setTimeout(function() {
        myImage.src = newSrc;  // Use the URL from the data attribute
        myImage.style.opacity = 1;
    }, 600);
}

var homepara = "<p>Coral reefs are some of the most diverse ecosystems in the world. Coral polyps, the animals responsible for building reefs, can take many forms: large reef building colonies, graceful flowing fans, and even small, solitary organisms. Thousands of species of corals have been discovered; some live in warm, shallow, tropical seas and others in the cold, dark depths of the ocean. It's estimated that there are approximately 2,500 to 3,000 known species of corals. These corals are classified into two main groups:<br><br>Hard Corals (Scleractinia): These corals secrete a calcium carbonate skeleton and form the backbone of coral reefs. They are the primary reef-building corals and are known for their intricate skeletal structures.<br><br>Soft Corals (Alcyonacea): Soft corals lack a hard skeleton and have a flexible, fleshy appearance. They are often found in a variety of reef habitats and include species such as sea fans, sea whips, and sea pens.<br><br>Shallow water, reef-building corals have a symbiotic relationship with photosynthetic algae called zooxanthellae, which live in their tissues. The coral provides a protected environment and the compounds zooxanthellae need for photosynthesis. In return, the algae produce carbohydrates that the coral uses for food, as well as oxygen. The algae also helps the coral remove waste. Since both partners benefit from association, this type of symbiosis is called mutualism.<br><br>Deep-sea corals live in much deeper or colder oceanic waters and lack zooxanthellae. Unlike their shallow water relatives, which rely heavily on photosynthesis to produce food, deep sea corals take in plankton and organic matter for much of their energy needs.<br><br>Coral reefs protect coastlines from storms and erosion, provide jobs for local communities, and offer opportunities for recreation. They are also a source of food and new medicines.<br><br> Hope that would have interested you to explore the rest of CoralAura! What are you waiting for, then!!!</p>";

changeText('paras', homepara);

var geopara = "<p>Welcome to the coral species spotlight! Discover the vibrant diversity of coral species that bring life to our oceans. From the resilient <a href='https://en.wikipedia.org/wiki/Acropora'>staghorn coral</a> to the intricate <a href='https://en.wikipedia.org/wiki/Brain_coral'>brain coral</a>, and the colorful <a href='https://en.wikipedia.org/wiki/Elkhorn_coral'>elkhorn coral</a>, each species plays a vital role in marine ecosystems. <br> <br> Our interactive guide features quick links to learn more about these fascinating species. Explore the world of coral through these resources and understand their importance in supporting marine biodiversity. Start your coral journey now!</p>"

var aboutpara = "<p>Welcome to CoralAura, your gateway to the captivating world of coral reefs! At CoralAura, our mission is simple yet profound: to educate and inspire a deeper understanding of the vital role coral ecosystems play in sustaining life on our planet. <br><br>Through innovative technologies such as machine learning, we analyze coral bleaching events, providing valuable insights for both the public and marine biologists alike. Our dedication to spreading awareness about coral conservation is rooted in the belief that by fostering understanding, we can spark positive change.<br><br> Join us in our journey to protect and preserve these irreplaceable marine treasures for generations to come. Together, let's illuminate the CoralAura and safeguard our oceans' vibrant biodiversity.</p>"

var mlpara = "<p>We've harnessed the power of YoloV8 image classifier to identify the percentage coverage of healthy or bleached corals in the uploaded image. <br><br>Our AI model not only aids biologists and divers in automatic identification but also facilitates automation by enabling robots to navigate deep corals and perform identification tasks autonomously. With data collected from diverse sources, our web-based platform allows users to simply upload a photo for analysis, delivering essential results swiftly and accurately.<br><br> Join us in revolutionizing coral reef conservation and exploration through advanced AI technology.</p>"


const fileDropArea = document.getElementById('file-drop-area');
const fileInput = document.getElementById('file-input');
const placeholderText = document.getElementById('placeholder-text');
const displayDiv = document.getElementById('display-div');

fileDropArea.addEventListener('click', () => {
  fileInput.click();
});

fileDropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileDropArea.classList.add('drag-over');
});

fileDropArea.addEventListener('dragleave', () => {
  fileDropArea.classList.remove('drag-over');
});

fileDropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  fileDropArea.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  handleFile(file);
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  handleFile(file);
});

function handleFile(file) {
  if (file && file.type.startsWith('image/') && fileInput.files.length <= 1) {
    const reader = new FileReader();
    reader.onload = (e) => {
      displayDiv.style.backgroundImage = `url(${e.target.result})`;
      displayDiv.textContent = ''; // Clear text content
    };
    reader.readAsDataURL(file);
    placeholderText.textContent = file.name; // Replace the placeholder text with the file name
  } else {
    alert('Please upload only one image');
    fileInput.value = '';
    placeholderText.textContent = 'Drag & drop your image here or click to upload'; // Reset the placeholder text
  }
}