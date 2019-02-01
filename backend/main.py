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

while True:
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT * FROM urls");
    rows = cur.fetchall()
    for row in rows:
        try:
            status = call("rm -f output.json && scrapy crawl quotes -a url='%s' -a email='%s' -a previous_price=%f -o output.json" % (row[1], row[0], row[2]), cwd="/home/ec2-user/spider", shell=True)
        except Exception, e:
            pass
    conn.commit()
    conn.close()
    sleep(600)

