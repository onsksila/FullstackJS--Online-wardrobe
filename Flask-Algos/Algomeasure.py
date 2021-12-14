import json
import math


def get_xy_fron_index(i):
    return int(i % 480), int(i/480)  #tkolli kade noumrou l pixel x w y d un pixel donné  aleh nakssem ala ordh taswira besh nekhou l pixel men fouk
                                     # height 640  width 480 de l image passée a lalgo
     # l axe des x(reste de la division)        #mon point sur l axe des y



def get_dist(i, j): #dist dans lespace racine ((x1-x2)2-(y1-y2)2)
    x1, y1 = get_xy_fron_index(i)
    x2, y2 = get_xy_fron_index(j)
    return math.sqrt((x1 - x2)**2 + ((y1-y2)**2))

def get_body_height(i, j): #get height par pixel nbr pixel from tete to pieds
    x1, y1 = get_xy_fron_index(i)
    x2, y2 = get_xy_fron_index(j)
    return abs(y2 - y1)


# dt1 = list(dt)



def get_ratio(data, humain_height):
    dt = [int(i) for i in data if data[i] != -1]
    i, j = dt[0], dt[-1]
    return round(humain_height / get_body_height(i, j), 2)


def get_max_dist_left_hand(data, humain_height):
    dt = [int(i) for i in data if data[i] in [16, 20]]
    dt = [dt[0]] + [dt[i] for i in range(1, len(dt)-1) if not ((dt[i-1] + 1 == dt[i]) and (dt[i+1] - 1 == dt[i]))] + [dt[len(dt)-1]]
    l = len(dt)
    max_dist = 0
    for i in range(l):
        for j in range(i+1, l):
            max_dist = max(get_dist(dt[i], dt[j]), max_dist)
    return max_dist * get_ratio(data, humain_height) * math.sqrt(3)

# def get_max_dist_left_hand(data, humain_height):
#     dt = [get_xy_fron_index(int(i))[0] for i in data if data[i] in [2,6]]
#     return (max(dt) - min(dt)) * get_ratio(data, humain_height)

def get_max_dist_left_hand(data, humain_height):
    dt = [int(i) for i in data if data[i] in [2, 6]]
    dt = [dt[0]] + [dt[i] for i in range(1, len(dt)-1) if not ((dt[i-1] + 1 == dt[i]) and (dt[i+1] - 1 == dt[i]))] + [dt[len(dt)-1]] #nahina les points eli fel west juste le contour
    l = len(dt)
    max_dist = 0
    for i in range(l):
        for j in range(i+1, l):
            max_dist = max(get_dist(dt[i], dt[j]), max_dist)
    return max_dist * get_ratio(data, humain_height) * math.sqrt(3)


# def get_max_dist_right_hand(data, humain_height):
#     dt = [get_xy_fron_index(int(i))[0] for i in data if data[i] in [4,8]]
#     return (max(dt) - min(dt)) * get_ratio(data, humain_height)


def get_max_dist_right_hand(data, humain_height):
    dt = [int(i) for i in data if data[i] in [4, 8]]
    dt = [dt[0]] + [dt[i] for i in range(1, len(dt)-1) if not ((dt[i-1] + 1 == dt[i]) and (dt[i+1] - 1 == dt[i]))] + [dt[len(dt)-1]]
    l = len(dt)
    max_dist = 0
    for i in range(l):
        for j in range(i+1, l):
            max_dist = max(get_dist(dt[i], dt[j]), max_dist)
    return max_dist * get_ratio(data, humain_height) * math.sqrt(3)


def get_max_dist_left_leg(data, humain_height):
    dt = [int(i) for i in data if data[i] in [14, 18]]
    dt = [dt[0]] + [dt[i] for i in range(1, len(dt)-1) if not ((dt[i-1] + 1 == dt[i]) and (dt[i+1] - 1 == dt[i]))] + [dt[len(dt)-1]]
    l = len(dt)
    max_dist = 0
    for i in range(l):
        for j in range(i+1, l):
            max_dist = max(get_dist(dt[i], dt[j]), max_dist)
    return max_dist * get_ratio(data, humain_height) * math.sqrt(3)


def get_max_dist_right_leg(data, humain_height):
    dt = [get_xy_fron_index(int(i))[0] for i in data if data[i] in [16,20]]
    return (max(dt) - min(dt)) * get_ratio(data, humain_height) * math.sqrt(3)


def get_max_dist_right_leg(data, humain_height):
    dt = [int(i) for i in data if data[i] in [16, 20]]
    dt = [dt[0]] + [dt[i] for i in range(1, len(dt)-1) if not ((dt[i-1] + 1 == dt[i]) and (dt[i+1] - 1 == dt[i]))] + [dt[len(dt)-1]]
    l = len(dt)
    max_dist = 0
    for i in range(l):
        for j in range(i+1, l):
            max_dist = max(get_dist(dt[i], dt[j]), max_dist)
    return max_dist * get_ratio(data, humain_height) * math.sqrt(3)


def get_shoulder(data, humain_height):
    dt = [get_xy_fron_index(int(i))[1] for i in data if data[i] == 12]
    return (max(dt) - min(dt)) * get_ratio(data, humain_height)

def get_ceinture_face(data, humain_height):
    dt = [get_xy_fron_index(int(i))[1] for i in data if data[i] in [14, 15, 16, 17]]
    return (max(dt) - min(dt)) * get_ratio(data, humain_height)

def get_ceinture_profile(data, humain_height):
    dt = [int(i) for i in data if data[i] in [14, 15]]
    dt = [dt[0]] + [dt[i] for i in range(1, len(dt)-1) if not ((dt[i-1] + 1 == dt[i]) and (dt[i+1] - 1 == dt[i]))] + [dt[len(dt)-1]]
    result = []
    for i in range(len(dt) - 1):
        if get_xy_fron_index(dt[i])[1] == get_xy_fron_index(dt[i+1])[1]:
            result.append(get_xy_fron_index(dt[i + 1])[0] - get_xy_fron_index(dt[i])[0])
    return max(result) * get_ratio(data, humain_height)
    # return (max(dt) - min(dt)) * get_ratio(data, humain_height)


def get_ceinture_volume(data, data1, humain_height):
    d1 = get_ceinture_profile(data1, humain_height)
    d2 = get_ceinture_face(data, humain_height)

    return math.sqrt((d1*d1)+(d2*d2))*2