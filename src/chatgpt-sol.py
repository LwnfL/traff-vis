import csv

def read_csv_to_dict(file_path, column_name):
    data_dict = {}
    index = 0
    with open(file_path, 'r') as csvfile:
        csv_reader = csv.DictReader(csvfile)
        for row in csv_reader:
            if column_name in row:
                print (row[column_name])
                coord=row[column_name]
                coord=coord[11:-1]
                coordinates=coord.split(',')
                data_dict[index] = coordinates
                index+=1
    return data_dict

if __name__ == "__main__":
    csv_file_path = "/Users/samwang/code/traff-vis/Data/sample_link_info.csv"

    column_to_extract = 'geometry'

    result_dict = read_csv_to_dict(csv_file_path, column_to_extract)
    print(result_dict)