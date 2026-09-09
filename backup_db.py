import os, sqlite3
from datetime import datetime
base=os.path.dirname(os.path.abspath(__file__))
src=os.environ.get('BLUSHCART_DB_PATH') or os.path.join(base,'blushcart.db')
outdir=os.environ.get('BLUSHCART_BACKUP_DIR') or os.path.join(base,'backups')
os.makedirs(outdir,exist_ok=True)
dst=os.path.join(outdir,'blushcart-'+datetime.now().strftime('%Y%m%d-%H%M%S')+'.db')
source=sqlite3.connect(src); target=sqlite3.connect(dst)
with target: source.backup(target)
target.close(); source.close()
print(dst)
