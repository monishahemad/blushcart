FROM python:3.12-slim
WORKDIR /app
COPY bundle /tmp/blushcart-bundle
RUN python -c "from pathlib import Path; import base64,zipfile,io; d=''.join(p.read_text() for p in sorted(Path('/tmp/blushcart-bundle').glob('part*.b64'))); zipfile.ZipFile(io.BytesIO(base64.b64decode(d))).extractall('/app')"
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    BLUSHCART_HOST=0.0.0.0 \
    PORT=5000
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:5000/api/health', timeout=3)"
CMD ["python", "server.py"]
