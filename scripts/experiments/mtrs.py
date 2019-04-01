import pandas as pd

if __name__ == "__main__":
    tmp = pd.read_csv('./scripts/experiments/metersampledata.csv')
    tmp['date'] = pd.to_datetime(tmp['timestamp'], unit='s')

    grp = tmp.groupby('meterid')
    gsz = grp.size()
    print ('Grouping done by meters, variable grp, length of grp = number of meters')
    print (len(grp)) 

    meters_array = {}
    for name, group in grp:
        meters_array[name] = group

    # print (len(meters_array[1]))
    # meters_array[1][:10]
    # for meter, entries in meters_array.items():
    #     print (meter)
    #     print (entries[0:5])

    print ()
    def scanSpotEvents(spotEvents):
        # print ('First 5 Events: \n\n', spotEvents[0:5])
        # print (type(spotEvents))
        parkTimeStartMarker = False
        parkTimeStartTS = 0
        parkTimeStopTS = 0

        parkingHours = []

        # Iterate over rows of the parking dataframe
        for index, row in spotEvents.iterrows():
            
            ts = row['timestamp']
            # ts = row['date']
            op = row['isOccupied']
            # print(ts, op)
            # print ('-------------------------')
            # print (index, ts, op)
            # print (index, row['timestamp'], ts, op)
            if op == True and (not parkTimeStartMarker):
                # First time Occupied in this data set
                # We encounter True means parking started
                
                parkTimeStartMarker = True
                parkTimeStartTS = ts
                # print ('Start Park')
            elif op == False and parkTimeStartMarker:
                # the parkTimeStartMarker is set, parking is on
                # we get False - that means parking ended
                parkTimeStopTS = ts
                # bank the parking time, reset flag to False
                tmp = {}
                tmp['start'] = parkTimeStartTS
                tmp['stop'] = parkTimeStopTS
                tmp['parkTime'] = parkTimeStopTS - parkTimeStartTS
                # print (tmp)
                parkingHours.append(tmp)
                parkTimeStartMarker = False
                # print('Stop Park')
            # else:
            #     # print('@@@@@@@@@')

        return parkingHours
        
       
parkingUsage = scanSpotEvents(meters_array[1])

print(parkingUsage)