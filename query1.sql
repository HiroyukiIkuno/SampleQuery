SELECT * FROM buildinginfo
WHERE CONCAT_WS(' ',id,name,address,room_num,floor_num,deve_name,building_type,device_cate,build_start_date,build_complete_date,remarks,account_id,coordinate) LIKE $1
AND account_id = $2
ORDER BY $3
LIMIT $4
OFFSET $5
;
