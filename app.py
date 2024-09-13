import os
import subprocess
import re
from flask import Flask, request, render_template

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads/'

# Function to run the model via subprocess
def run_model(image_path):
    command = [
        "python", "-c",
        f"from ultralytics import YOLO;"
        f"model = YOLO('classbest.pt');"
        f"model.predict('{image_path}')"
    ]

    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    output = result.stdout + result.stderr

    # Regex to extract result (modify based on actual output format)
    match = re.search(r'(\w+ \d\.\d+)', output)

    if match:
        return match.group(0)  # Extracted info
    else:
        return "No match found"

# Function to delete all files in the uploads folder
def delete_uploaded_files():
    folder = app.config['UPLOAD_FOLDER']
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)  # Delete the file
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return render_template('index.html', result="No image uploaded"), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return render_template('index.html', result="No image selected"), 400
    
    if file:
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(image_path)
        
        result = run_model(image_path)
        
        if result:
            result_parts = result.split()
            class_name = result_parts[0]
            score_value = int(float(result_parts[1]) * 100)
        else:
            class_name = "N/A"
            score_value = "0"
        
        # Call delete_uploaded_files after result processing
        response = render_template('index.html', class_name=class_name, score_value=score_value)
        delete_uploaded_files()  # Clean up uploaded files
        
        return response


if __name__ == '__main__':
    # Ensure the upload folder exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    
    app.run(debug=True)
