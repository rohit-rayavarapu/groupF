From python:3.12.10
WORKDIR /app
COPY app.py .   
CMD ["python", "app.py"]