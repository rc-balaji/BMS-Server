const sam = {
  name: "MEGATECH BMS 1",
  mac_address: "A4:C1:37:30:87:B9",
  topic: "bms-1",
  soc: 54,
  states: { charging: true, balance: false, dis_mos: true, protection: true },
  svi: [
    { name: "Cell 1", value: 3.937 },
    { name: "Cell 2", value: 4.172 },
    { name: "Cell 3", value: 3.84 },
  ],
  temperature: [
    { 1: 33.2, 2: 36.71, mos: 67 },
    { 1: 87.69, 2: 75.91, mos: 70.67 },
  ],
  values: {
    total_volt: 49.52,
    current: 7.68,
    power: 67.85,
    vol_high: 4.106,
    vol_low: 3.387,
    vol_diff: 0.326,
    ave_vol: 3.928,
    cycle_index: 108,
  },
};
