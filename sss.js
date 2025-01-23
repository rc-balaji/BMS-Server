const sam2 = {
  name: "MEGATECH BMS 1",
  mac_address: "A4:C1:37:30:87:B9",
  soc: 23,
  states: { charging: false, balance: false, dis_mos: true, protection: false },
  svi: [
    { name: "Cell 1", value: 3.763 },
    { name: "Cell 2", value: 3.556 },
    { name: "Cell 3", value: 3.843 },
  ],
  temperature: [
    { mos: 32.06, 1: 56.26, 2: 35.98 },
    { mos: 79.5, 1: 81.5, 2: 75.89 },
  ],
  values: {
    total_volt: 59.93,
    current: 0.47,
    power: 3.69,
    vol_high: 4.083,
    vol_low: 3.322,
    vol_diff: 0.264,
    ave_vol: 3.746,
    cycle_index: 318,
  },
};
