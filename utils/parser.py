import csv
import json

CSV_PATH = './temp/torri.csv'
JSON_PATH = './temp/torri.min.json'

if __name__ == '__main__':
    result = []
    with open(CSV_PATH, 'r') as f:
        reader = csv.DictReader(f)
        id = 0
        for line in reader:
            result.append({
                "id": id,
                "lat": line['lat'],
                "lng": line['lng'],
                "nota": line['nota'],
                "numero": line['numero'],
                "peso": line['peso'],
                "condizione": line['condizione'],
                "paese": line['luogo'],
                "chiesa": line['chiesa']
            })
    with open(JSON_PATH, 'w') as f:
        json.dump(result, f)
