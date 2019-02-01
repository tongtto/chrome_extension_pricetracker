import psycopg2
from subprocess import call
from time import sleep

def get_conn():
    return psycopg2.connect(
        database="postgres",
        user="tx17",
        password="cloudcomputing",
        host="pricetracker.ccao5jndini9.us-east-1.rds.amazonaws.com",
        port = "5432"
    )

conn = get_conn()
cur = conn.cursor()
cur.execute("SELECT * FROM urls");
rows = cur.fetchall()
for row in rows:
    print row
conn.commit()
conn.close()

