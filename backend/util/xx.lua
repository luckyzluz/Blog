-- if client.call("get",KEYS[1]) == ARGV[1] then
--     return client.call("del",KEYS[1])
-- else
--     return 0
-- end
-- local key = tostring(KEYS[1]);
-- local value = tostring(ARGV[1]);

-- local oldValue = redis.call("GET", key);

-- if (oldValue == value) then
--   return redis.call("DEL", key);
-- else
--   return 0;
-- end
redis.call("SELECT",0)
local resultx =redis.call("HGETALL","categorys");
local result='{';
local xx={'xx',1122}
local yy={}
-- for i, v in ipairs(result) do
--   if i % 2 == 0 then
--     -- xx[i]=  v;
--   else
--   end
-- end

return resultx;
