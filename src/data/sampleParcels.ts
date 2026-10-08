import { Parcel } from '../types/parcel';

export const INITIAL_PARCELS: Parcel[] = [
  {
    trackingId: 'TRK1001',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    customerEmail: 'rahul.sharma@example.com',
    sourceCity: 'Mumbai',
    destinationCity: 'Hyderabad',
    currentLocation: 'Pune Transit Terminal (MH)',
    currentStatus: 'In Transit',
    estimatedDeliveryDate: '2026-10-10',
    createdAt: '2026-10-06T08:30:00.000Z',
    updatedAt: '2026-10-08T06:30:00.000Z',
    weightKg: 2.4,
    priority: 'Express',
    history: [
      {
        id: 'h-1001-1',
        timestamp: '2026-10-06T08:30:00.000Z',
        location: 'Mumbai Central Booking Office',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Consignment booked online. Prepaid Express Air.',
        operatorName: 'Staff K. Desai'
      },
      {
        id: 'h-1001-2',
        timestamp: '2026-10-06T14:15:00.000Z',
        location: 'Mumbai Andheri West Hub',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Assigned courier agent picked up package from sender address.',
        operatorName: 'Rider Sunil M.'
      },
      {
        id: 'h-1001-3',
        timestamp: '2026-10-07T03:45:00.000Z',
        location: 'BOM Mega Sorting Center - Conveyor 02',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Barcode verified. Automated optical dimension scanning completed.',
        operatorName: 'Hub Supervisor Amit P.'
      },
      {
        id: 'h-1001-4',
        timestamp: '2026-10-08T06:30:00.000Z',
        location: 'Pune Transit Terminal (MH)',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Dispatched via Intercity Express Container Truck MH-12-TR-9081 towards Hyderabad.',
        operatorName: 'Dispatcher R. Nair'
      }
    ]
  },
  {
    trackingId: 'TRK1002',
    customerName: 'Ananya Iyer',
    customerPhone: '+91 91234 56789',
    customerEmail: 'ananya.iyer@example.com',
    sourceCity: 'Bengaluru',
    destinationCity: 'Chennai',
    currentLocation: 'Chennai Guindy Delivery Hub',
    currentStatus: 'Out for Delivery',
    estimatedDeliveryDate: '2026-10-08',
    createdAt: '2026-10-06T10:00:00.000Z',
    updatedAt: '2026-10-08T05:45:00.000Z',
    weightKg: 1.1,
    priority: 'Priority Overnight',
    history: [
      {
        id: 'h-1002-1',
        timestamp: '2026-10-06T10:00:00.000Z',
        location: 'Bengaluru Indiranagar Outlet',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Electronics parcel verified.',
        operatorName: 'Staff V. Mohan'
      },
      {
        id: 'h-1002-2',
        timestamp: '2026-10-06T16:20:00.000Z',
        location: 'Bengaluru Whitefield Hub',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Picked up by field courier.',
        operatorName: 'Rider Ganesh T.'
      },
      {
        id: 'h-1002-3',
        timestamp: '2026-10-07T02:10:00.000Z',
        location: 'BLR Gateway Sorting Center',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Passed automated sorting chute 4.',
        operatorName: 'Tech S. Joseph'
      },
      {
        id: 'h-1002-4',
        timestamp: '2026-10-07T18:30:00.000Z',
        location: 'Hosur-Chennai Expressway Corridor',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Night line-haul truck transit.',
        operatorName: 'Fleet Logistician P. Das'
      },
      {
        id: 'h-1002-5',
        timestamp: '2026-10-08T05:45:00.000Z',
        location: 'Chennai Guindy Delivery Hub',
        previousStatus: 'In Transit',
        newStatus: 'Out for Delivery',
        notes: 'Handed over to delivery associate Vignesh (Van TN-09-AZ-3321).',
        operatorName: 'Agent Vignesh R.'
      }
    ]
  },
  {
    trackingId: 'TRK1003',
    customerName: 'Vikramaditya Sen',
    customerPhone: '+91 97890 12345',
    customerEmail: 'vikram.sen@example.com',
    sourceCity: 'Delhi NCR',
    destinationCity: 'Kolkata',
    currentLocation: 'Kolkata Salt Lake Hub',
    currentStatus: 'Delivered',
    estimatedDeliveryDate: '2026-10-07',
    createdAt: '2026-10-04T09:00:00.000Z',
    updatedAt: '2026-10-07T16:15:00.000Z',
    weightKg: 4.8,
    priority: 'Standard',
    history: [
      {
        id: 'h-1003-1',
        timestamp: '2026-10-04T09:00:00.000Z',
        location: 'Delhi Okhla Industrial Area',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Commercial documentation accepted.',
        operatorName: 'Staff Pradeep K.'
      },
      {
        id: 'h-1003-2',
        timestamp: '2026-10-04T15:30:00.000Z',
        location: 'Delhi NCR Intake Facility',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Pallet consolidation complete.',
        operatorName: 'Driver Rakesh M.'
      },
      {
        id: 'h-1003-3',
        timestamp: '2026-10-05T01:40:00.000Z',
        location: 'DEL Mega Hub Terminal 3',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'X-ray safety protocol passed.',
        operatorName: 'Inspector Alok S.'
      },
      {
        id: 'h-1003-4',
        timestamp: '2026-10-06T04:20:00.000Z',
        location: 'Varanasi-Kolkata Trunk Route',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Direct cargo freight line-haul.',
        operatorName: 'Fleet Admin J. Roy'
      },
      {
        id: 'h-1003-5',
        timestamp: '2026-10-07T08:30:00.000Z',
        location: 'Kolkata Salt Lake Sector V',
        previousStatus: 'In Transit',
        newStatus: 'Out for Delivery',
        notes: 'Out with delivery executive Subhash.',
        operatorName: 'Executive Subhash B.'
      },
      {
        id: 'h-1003-6',
        timestamp: '2026-10-07T16:15:00.000Z',
        location: 'Kolkata Salt Lake (Delivered)',
        previousStatus: 'Out for Delivery',
        newStatus: 'Delivered',
        notes: 'Delivered to customer. OTP authentication verified: 8841.',
        operatorName: 'Executive Subhash B.'
      }
    ]
  },
  {
    trackingId: 'TRK1004',
    customerName: 'Priya Nambiar',
    customerPhone: '+91 98450 67890',
    customerEmail: 'priya.n@example.com',
    sourceCity: 'Kochi',
    destinationCity: 'Bengaluru',
    currentLocation: 'BLR Sorting Center (Peenya)',
    currentStatus: 'At Sorting Center',
    estimatedDeliveryDate: '2026-10-09',
    createdAt: '2026-10-07T11:20:00.000Z',
    updatedAt: '2026-10-08T04:10:00.000Z',
    weightKg: 0.75,
    priority: 'Express',
    history: [
      {
        id: 'h-1004-1',
        timestamp: '2026-10-07T11:20:00.000Z',
        location: 'Kochi Marine Drive Booking Kiosk',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Package registered and label affixed.',
        operatorName: 'Staff George V.'
      },
      {
        id: 'h-1004-2',
        timestamp: '2026-10-07T17:00:00.000Z',
        location: 'Kochi Central Hub',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Collected from parcel drop locker.',
        operatorName: 'Courier Manoj C.'
      },
      {
        id: 'h-1004-3',
        timestamp: '2026-10-08T04:10:00.000Z',
        location: 'BLR Sorting Center (Peenya)',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Enqueued in Hub Processing Queue for feeder division.',
        operatorName: 'Hub Specialist Deepa R.'
      }
    ]
  },
  {
    trackingId: 'TRK1005',
    customerName: 'Arjun Patel',
    customerPhone: '+91 99090 11223',
    customerEmail: 'arjun.patel@example.com',
    sourceCity: 'Ahmedabad',
    destinationCity: 'Pune',
    currentLocation: 'Ahmedabad SG Highway Station',
    currentStatus: 'Picked Up',
    estimatedDeliveryDate: '2026-10-11',
    createdAt: '2026-10-08T02:15:00.000Z',
    updatedAt: '2026-10-08T06:10:00.000Z',
    weightKg: 3.2,
    priority: 'Standard',
    history: [
      {
        id: 'h-1005-1',
        timestamp: '2026-10-08T02:15:00.000Z',
        location: 'Ahmedabad SG Highway Station',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Handed over by commercial supplier.',
        operatorName: 'Staff Chirag B.'
      },
      {
        id: 'h-1005-2',
        timestamp: '2026-10-08T06:10:00.000Z',
        location: 'Ahmedabad SG Highway Station',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Vehicle departure scheduled for sorting center dispatch.',
        operatorName: 'Driver Nilesh P.'
      }
    ]
  },
  {
    trackingId: 'TRK1006',
    customerName: 'Sneha Kulkarni',
    customerPhone: '+91 97654 32190',
    customerEmail: 'sneha.k@example.com',
    sourceCity: 'Pune',
    destinationCity: 'Delhi NCR',
    currentLocation: 'Pune Baner Express Hub',
    currentStatus: 'Order Placed',
    estimatedDeliveryDate: '2026-10-12',
    createdAt: '2026-10-08T06:00:00.000Z',
    updatedAt: '2026-10-08T06:00:00.000Z',
    weightKg: 1.8,
    priority: 'Express',
    history: [
      {
        id: 'h-1006-1',
        timestamp: '2026-10-08T06:00:00.000Z',
        location: 'Pune Baner Express Hub',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Shipment booking generated. Awaiting pickup dispatch.',
        operatorName: 'Staff Pooja G.'
      }
    ]
  },
  {
    trackingId: 'TRK1007',
    customerName: 'Mohammad Tariq',
    customerPhone: '+91 98111 22334',
    customerEmail: 'tariq.m@example.com',
    sourceCity: 'Hyderabad',
    destinationCity: 'Mumbai',
    currentLocation: 'BOM Mega Sorting Center',
    currentStatus: 'At Sorting Center',
    estimatedDeliveryDate: '2026-10-09',
    createdAt: '2026-10-06T15:00:00.000Z',
    updatedAt: '2026-10-08T03:50:00.000Z',
    weightKg: 5.5,
    priority: 'Priority Overnight',
    history: [
      {
        id: 'h-1007-1',
        timestamp: '2026-10-06T15:00:00.000Z',
        location: 'Hyderabad Hitec City Office',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Priority medical diagnostic kit.',
        operatorName: 'Staff Farhan A.'
      },
      {
        id: 'h-1007-2',
        timestamp: '2026-10-06T19:30:00.000Z',
        location: 'Hyderabad Begumpet Gateway',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Expedited air cargo transfer.',
        operatorName: 'Officer Salman K.'
      },
      {
        id: 'h-1007-3',
        timestamp: '2026-10-07T21:00:00.000Z',
        location: 'Interstate Air Freight HYD-BOM',
        previousStatus: 'Picked Up',
        newStatus: 'In Transit',
        notes: 'Flight 6E-824 air transit completed.',
        operatorName: 'Cargo Flight Agent'
      },
      {
        id: 'h-1007-4',
        timestamp: '2026-10-08T03:50:00.000Z',
        location: 'BOM Mega Sorting Center',
        previousStatus: 'In Transit',
        newStatus: 'At Sorting Center',
        notes: 'In queue for automated routing to Mumbai South bay.',
        operatorName: 'Supervisor Ramesh N.'
      }
    ]
  },
  {
    trackingId: 'TRK1008',
    customerName: 'Kavita Chawla',
    customerPhone: '+91 98777 66554',
    customerEmail: 'kavita.c@example.com',
    sourceCity: 'Chandigarh',
    destinationCity: 'Bengaluru',
    currentLocation: 'DEL Mega Hub Terminal 3',
    currentStatus: 'In Transit',
    estimatedDeliveryDate: '2026-10-10',
    createdAt: '2026-10-07T08:00:00.000Z',
    updatedAt: '2026-10-08T01:30:00.000Z',
    weightKg: 2.1,
    priority: 'Express',
    history: [
      {
        id: 'h-1008-1',
        timestamp: '2026-10-07T08:00:00.000Z',
        location: 'Chandigarh Sector 17 Hub',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Handcrafted items packaged in bubble wrap.',
        operatorName: 'Staff Harpreet S.'
      },
      {
        id: 'h-1008-2',
        timestamp: '2026-10-07T13:40:00.000Z',
        location: 'Ambala Logistics Depot',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Loaded on regional feeder line.',
        operatorName: 'Driver Gurinder S.'
      },
      {
        id: 'h-1008-3',
        timestamp: '2026-10-07T20:10:00.000Z',
        location: 'DEL Mega Hub Terminal 3',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Processed through high-speed sorter 1.',
        operatorName: 'Staff Vikram N.'
      },
      {
        id: 'h-1008-4',
        timestamp: '2026-10-08T01:30:00.000Z',
        location: 'DEL Mega Hub Terminal 3',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Air freight cargo manifest generated for BLR.',
        operatorName: 'Dispatcher Sunita T.'
      }
    ]
  },
  {
    trackingId: 'TRK1009',
    customerName: 'Rohan Mehra',
    customerPhone: '+91 99887 76655',
    customerEmail: 'rohan.m@example.com',
    sourceCity: 'Mumbai',
    destinationCity: 'Ahmedabad',
    currentLocation: 'Ahmedabad Navrangpura Station',
    currentStatus: 'Out for Delivery',
    estimatedDeliveryDate: '2026-10-08',
    createdAt: '2026-10-06T12:00:00.000Z',
    updatedAt: '2026-10-08T06:15:00.000Z',
    weightKg: 0.9,
    priority: 'Express',
    history: [
      {
        id: 'h-1009-1',
        timestamp: '2026-10-06T12:00:00.000Z',
        location: 'Mumbai Dadar Station Outlet',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Standard parcel booked.',
        operatorName: 'Staff S. Sawant'
      },
      {
        id: 'h-1009-2',
        timestamp: '2026-10-06T18:00:00.000Z',
        location: 'Mumbai Goregaon Depot',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Container loaded.',
        operatorName: 'Rider Vijay P.'
      },
      {
        id: 'h-1009-3',
        timestamp: '2026-10-07T04:00:00.000Z',
        location: 'BOM Mega Sorting Center',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Sort ring exit 8 to Gujarat highway.',
        operatorName: 'Operator Ketan M.'
      },
      {
        id: 'h-1009-4',
        timestamp: '2026-10-07T14:30:00.000Z',
        location: 'Surat-Vadodara NH-48 Belt',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Overnight convoy transit.',
        operatorName: 'Driver Harish P.'
      },
      {
        id: 'h-1009-5',
        timestamp: '2026-10-08T06:15:00.000Z',
        location: 'Ahmedabad Navrangpura Station',
        previousStatus: 'In Transit',
        newStatus: 'Out for Delivery',
        notes: 'Out for final delivery delivery rider Jayesh.',
        operatorName: 'Rider Jayesh V.'
      }
    ]
  },
  {
    trackingId: 'TRK1010',
    customerName: 'Meera Menon',
    customerPhone: '+91 98470 11223',
    customerEmail: 'meera.m@example.com',
    sourceCity: 'Chennai',
    destinationCity: 'Hyderabad',
    currentLocation: 'Hyderabad Jubilee Hills Outlet',
    currentStatus: 'Delivered',
    estimatedDeliveryDate: '2026-10-07',
    createdAt: '2026-10-05T07:45:00.000Z',
    updatedAt: '2026-10-07T17:40:00.000Z',
    weightKg: 6.2,
    priority: 'Standard',
    history: [
      {
        id: 'h-1010-1',
        timestamp: '2026-10-05T07:45:00.000Z',
        location: 'Chennai T Nagar Center',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Textile parcel.',
        operatorName: 'Staff Bala R.'
      },
      {
        id: 'h-1010-2',
        timestamp: '2026-10-05T13:00:00.000Z',
        location: 'Chennai Koyambedu Hub',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Loaded into line-haul transport.',
        operatorName: 'Driver Saravanan'
      },
      {
        id: 'h-1010-3',
        timestamp: '2026-10-06T00:30:00.000Z',
        location: 'MAA Regional Hub',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Automated weight confirmation.',
        operatorName: 'Tech Murugan S.'
      },
      {
        id: 'h-1010-4',
        timestamp: '2026-10-06T10:15:00.000Z',
        location: 'Nellore-Vijayawada Corridor',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Highway line-haul on time.',
        operatorName: 'Driver Appa Rao'
      },
      {
        id: 'h-1010-5',
        timestamp: '2026-10-07T09:20:00.000Z',
        location: 'Hyderabad Begumpet Gateway',
        previousStatus: 'In Transit',
        newStatus: 'Out for Delivery',
        notes: 'Out for delivery with associate Ravi.',
        operatorName: 'Associate Ravi K.'
      },
      {
        id: 'h-1010-6',
        timestamp: '2026-10-07T17:40:00.000Z',
        location: 'Hyderabad Jubilee Hills Outlet',
        previousStatus: 'Out for Delivery',
        newStatus: 'Delivered',
        notes: 'Delivered to resident. Signed by Meera Menon.',
        operatorName: 'Associate Ravi K.'
      }
    ]
  },
  {
    trackingId: 'TRK1011',
    customerName: 'Tanvi Agarwal',
    customerPhone: '+91 99100 44556',
    customerEmail: 'tanvi.agarwal@example.com',
    sourceCity: 'Jaipur',
    destinationCity: 'Delhi NCR',
    currentLocation: 'Jaipur Mansarovar Terminal',
    currentStatus: 'Picked Up',
    estimatedDeliveryDate: '2026-10-09',
    createdAt: '2026-10-08T04:30:00.000Z',
    updatedAt: '2026-10-08T06:10:00.000Z',
    weightKg: 1.4,
    priority: 'Standard',
    history: [
      {
        id: 'h-1011-1',
        timestamp: '2026-10-08T04:30:00.000Z',
        location: 'Jaipur Mansarovar Terminal',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Package packaged and labeled.',
        operatorName: 'Staff Manish S.'
      },
      {
        id: 'h-1011-2',
        timestamp: '2026-10-08T06:10:00.000Z',
        location: 'Jaipur Mansarovar Terminal',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Collected for Delhi expressway transit.',
        operatorName: 'Driver Ashok B.'
      }
    ]
  },
  {
    trackingId: 'TRK1012',
    customerName: 'Aditya Roy',
    customerPhone: '+91 98200 99887',
    customerEmail: 'aditya.roy@example.com',
    sourceCity: 'Kolkata',
    destinationCity: 'Bengaluru',
    currentLocation: 'CCU Regional Hub Conveyor 3',
    currentStatus: 'At Sorting Center',
    estimatedDeliveryDate: '2026-10-10',
    createdAt: '2026-10-07T14:00:00.000Z',
    updatedAt: '2026-10-08T02:40:00.000Z',
    weightKg: 3.8,
    priority: 'Priority Overnight',
    history: [
      {
        id: 'h-1012-1',
        timestamp: '2026-10-07T14:00:00.000Z',
        location: 'Kolkata Park Street Counter',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Priority industrial samples.',
        operatorName: 'Staff Debabrata M.'
      },
      {
        id: 'h-1012-2',
        timestamp: '2026-10-07T18:45:00.000Z',
        location: 'Kolkata Howrah Terminal',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Pickup vehicle verified weight.',
        operatorName: 'Driver Swapan C.'
      },
      {
        id: 'h-1012-3',
        timestamp: '2026-10-08T02:40:00.000Z',
        location: 'CCU Regional Hub Conveyor 3',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Queued for air cargo flight container palletization.',
        operatorName: 'Tech Prasenjit D.'
      }
    ]
  },
  {
    trackingId: 'TRK1013',
    customerName: 'Divya Namboodiri',
    customerPhone: '+91 94470 66778',
    customerEmail: 'divya.n@example.com',
    sourceCity: 'Pune',
    destinationCity: 'Mumbai',
    currentLocation: 'Mumbai Chembur Hub',
    currentStatus: 'In Transit',
    estimatedDeliveryDate: '2026-10-08',
    createdAt: '2026-10-07T16:00:00.000Z',
    updatedAt: '2026-10-08T05:20:00.000Z',
    weightKg: 1.6,
    priority: 'Express',
    history: [
      {
        id: 'h-1013-1',
        timestamp: '2026-10-07T16:00:00.000Z',
        location: 'Pune Shivaji Nagar Center',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Expedited courier.',
        operatorName: 'Staff Shailesh J.'
      },
      {
        id: 'h-1013-2',
        timestamp: '2026-10-07T20:30:00.000Z',
        location: 'Pune PNQ Regional Hub',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Picked up for expressway shuttle.',
        operatorName: 'Rider Sandeep M.'
      },
      {
        id: 'h-1013-3',
        timestamp: '2026-10-08T01:10:00.000Z',
        location: 'PNQ Regional Hub',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Sorted into Mumbai East route tote.',
        operatorName: 'Supervisor Kiran T.'
      },
      {
        id: 'h-1013-4',
        timestamp: '2026-10-08T05:20:00.000Z',
        location: 'Mumbai Chembur Hub',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Arrived at Mumbai city gateway. Processing for delivery run.',
        operatorName: 'Agent Vinod B.'
      }
    ]
  },
  {
    trackingId: 'TRK1014',
    customerName: 'Karan Singhania',
    customerPhone: '+91 98333 44556',
    customerEmail: 'karan.s@example.com',
    sourceCity: 'Delhi NCR',
    destinationCity: 'Ahmedabad',
    currentLocation: 'Delhi Okhla Booking Hub',
    currentStatus: 'Order Placed',
    estimatedDeliveryDate: '2026-10-12',
    createdAt: '2026-10-08T05:30:00.000Z',
    updatedAt: '2026-10-08T05:30:00.000Z',
    weightKg: 7.1,
    priority: 'Standard',
    history: [
      {
        id: 'h-1014-1',
        timestamp: '2026-10-08T05:30:00.000Z',
        location: 'Delhi Okhla Booking Hub',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Heavy commercial shipment registered.',
        operatorName: 'Staff Gaurav S.'
      }
    ]
  },
  {
    trackingId: 'TRK1015',
    customerName: 'Fatima Zahra',
    customerPhone: '+91 98490 55667',
    customerEmail: 'fatima.z@example.com',
    sourceCity: 'Hyderabad',
    destinationCity: 'Bengaluru',
    currentLocation: 'BLR Sorting Center (Peenya)',
    currentStatus: 'At Sorting Center',
    estimatedDeliveryDate: '2026-10-09',
    createdAt: '2026-10-07T09:15:00.000Z',
    updatedAt: '2026-10-08T04:55:00.000Z',
    weightKg: 2.9,
    priority: 'Express',
    history: [
      {
        id: 'h-1015-1',
        timestamp: '2026-10-07T09:15:00.000Z',
        location: 'Hyderabad Banjara Hills',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Gift article packed in wooden carton.',
        operatorName: 'Staff Syed M.'
      },
      {
        id: 'h-1015-2',
        timestamp: '2026-10-07T14:40:00.000Z',
        location: 'HYD Regional Hub',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Dispatched to interstate line.',
        operatorName: 'Driver Qasim K.'
      },
      {
        id: 'h-1015-3',
        timestamp: '2026-10-07T23:00:00.000Z',
        location: 'NH-44 Andhra-Karnataka Border',
        previousStatus: 'Picked Up',
        newStatus: 'In Transit',
        notes: 'Intercity container vehicle moving steadily.',
        operatorName: 'Fleet Admin Naresh V.'
      },
      {
        id: 'h-1015-4',
        timestamp: '2026-10-08T04:55:00.000Z',
        location: 'BLR Sorting Center (Peenya)',
        previousStatus: 'In Transit',
        newStatus: 'At Sorting Center',
        notes: 'Arrived at Peenya hub. In sorting queue for Koramangala dispatch.',
        operatorName: 'Hub Lead Chetan P.'
      }
    ]
  },
  {
    trackingId: 'TRK1016',
    customerName: 'Vikrant Deshmukh',
    customerPhone: '+91 98220 88776',
    customerEmail: 'vikrant.d@example.com',
    sourceCity: 'Mumbai',
    destinationCity: 'Delhi NCR',
    currentLocation: 'Gurugram Sector 29 Delivery Hub',
    currentStatus: 'Out for Delivery',
    estimatedDeliveryDate: '2026-10-08',
    createdAt: '2026-10-05T11:00:00.000Z',
    updatedAt: '2026-10-08T06:05:00.000Z',
    weightKg: 1.3,
    priority: 'Express',
    history: [
      {
        id: 'h-1016-1',
        timestamp: '2026-10-05T11:00:00.000Z',
        location: 'Mumbai Bandra West',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Apparel order booked.',
        operatorName: 'Staff Nilesh K.'
      },
      {
        id: 'h-1016-2',
        timestamp: '2026-10-05T17:10:00.000Z',
        location: 'BOM Mega Sorting Center',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Intake scanned.',
        operatorName: 'Agent Prakash S.'
      },
      {
        id: 'h-1016-3',
        timestamp: '2026-10-06T02:30:00.000Z',
        location: 'BOM Mega Sorting Center',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Air freight manifest attached.',
        operatorName: 'Operator Santosh W.'
      },
      {
        id: 'h-1016-4',
        timestamp: '2026-10-07T05:00:00.000Z',
        location: 'DEL Mega Hub Terminal 3',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Transferred to NCR regional transit feeder.',
        operatorName: 'Dispatcher Sonu R.'
      },
      {
        id: 'h-1016-5',
        timestamp: '2026-10-08T06:05:00.000Z',
        location: 'Gurugram Sector 29 Delivery Hub',
        previousStatus: 'In Transit',
        newStatus: 'Out for Delivery',
        notes: 'Rider Mohit on delivery bike (HR-26-EA-4412).',
        operatorName: 'Rider Mohit K.'
      }
    ]
  },
  {
    trackingId: 'TRK1017',
    customerName: 'Shalini Verma',
    customerPhone: '+91 99350 77889',
    customerEmail: 'shalini.v@example.com',
    sourceCity: 'Lucknow',
    destinationCity: 'Delhi NCR',
    currentLocation: 'Noida Sector 62',
    currentStatus: 'Delivered',
    estimatedDeliveryDate: '2026-10-07',
    createdAt: '2026-10-05T09:30:00.000Z',
    updatedAt: '2026-10-07T14:50:00.000Z',
    weightKg: 2.0,
    priority: 'Express',
    history: [
      {
        id: 'h-1017-1',
        timestamp: '2026-10-05T09:30:00.000Z',
        location: 'Lucknow Hazratganj Office',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Parcel booked with fast courier tag.',
        operatorName: 'Staff Anoop T.'
      },
      {
        id: 'h-1017-2',
        timestamp: '2026-10-05T15:00:00.000Z',
        location: 'Lucknow Transport Nagar Depot',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Transferred to Agra-Lucknow expressway truck.',
        operatorName: 'Driver Rakesh Y.'
      },
      {
        id: 'h-1017-3',
        timestamp: '2026-10-06T03:00:00.000Z',
        location: 'DEL Mega Hub Terminal 3',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Automated sorting to East NCR.',
        operatorName: 'Tech Vinay S.'
      },
      {
        id: 'h-1017-4',
        timestamp: '2026-10-06T19:00:00.000Z',
        location: 'Noida Logistics Center',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Transit to last-mile station.',
        operatorName: 'Agent Kuldeep M.'
      },
      {
        id: 'h-1017-5',
        timestamp: '2026-10-07T08:30:00.000Z',
        location: 'Noida Sector 62',
        previousStatus: 'In Transit',
        newStatus: 'Out for Delivery',
        notes: 'Out for delivery with associate Rahul.',
        operatorName: 'Associate Rahul S.'
      },
      {
        id: 'h-1017-6',
        timestamp: '2026-10-07T14:50:00.000Z',
        location: 'Noida Sector 62 (Delivered)',
        previousStatus: 'Out for Delivery',
        newStatus: 'Delivered',
        notes: 'Delivered to recipient. Signature captured.',
        operatorName: 'Associate Rahul S.'
      }
    ]
  },
  {
    trackingId: 'TRK1018',
    customerName: 'Suresh Babu',
    customerPhone: '+91 94440 33445',
    customerEmail: 'suresh.babu@example.com',
    sourceCity: 'Bengaluru',
    destinationCity: 'Hyderabad',
    currentLocation: 'BLR Mega Hub Conveyor 01',
    currentStatus: 'At Sorting Center',
    estimatedDeliveryDate: '2026-10-09',
    createdAt: '2026-10-07T18:00:00.000Z',
    updatedAt: '2026-10-08T03:15:00.000Z',
    weightKg: 4.1,
    priority: 'Priority Overnight',
    history: [
      {
        id: 'h-1018-1',
        timestamp: '2026-10-07T18:00:00.000Z',
        location: 'Bengaluru Electronic City Kiosk',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Critical IT hardware shipment.',
        operatorName: 'Staff Karthik R.'
      },
      {
        id: 'h-1018-2',
        timestamp: '2026-10-07T22:30:00.000Z',
        location: 'BLR Mega Hub Intake Bay',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Collected via priority logistics van.',
        operatorName: 'Driver Somanna'
      },
      {
        id: 'h-1018-3',
        timestamp: '2026-10-08T03:15:00.000Z',
        location: 'BLR Mega Hub Conveyor 01',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'In hub queue for flight transfer to Hyderabad Rajiv Gandhi airport.',
        operatorName: 'Hub Supervisor Jagdish M.'
      }
    ]
  },
  {
    trackingId: 'TRK1019',
    customerName: 'Gaurav Bhattacharya',
    customerPhone: '+91 98300 11998',
    customerEmail: 'gaurav.b@example.com',
    sourceCity: 'Kolkata',
    destinationCity: 'Mumbai',
    currentLocation: 'Nagpur Central Freight Junction',
    currentStatus: 'In Transit',
    estimatedDeliveryDate: '2026-10-10',
    createdAt: '2026-10-06T11:00:00.000Z',
    updatedAt: '2026-10-08T05:50:00.000Z',
    weightKg: 3.5,
    priority: 'Standard',
    history: [
      {
        id: 'h-1019-1',
        timestamp: '2026-10-06T11:00:00.000Z',
        location: 'Kolkata Dum Dum Center',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Package registered and barcode printed.',
        operatorName: 'Staff Arijit M.'
      },
      {
        id: 'h-1019-2',
        timestamp: '2026-10-06T17:15:00.000Z',
        location: 'Kolkata CCU Hub',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Consignment palletized.',
        operatorName: 'Driver Bikash D.'
      },
      {
        id: 'h-1019-3',
        timestamp: '2026-10-07T06:00:00.000Z',
        location: 'CCU Regional Hub',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Dispatched to National Highway 53 corridor.',
        operatorName: 'Operator Sourav B.'
      },
      {
        id: 'h-1019-4',
        timestamp: '2026-10-08T05:50:00.000Z',
        location: 'Nagpur Central Freight Junction',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Cross-dock intermediate scanning completed.',
        operatorName: 'Hub Inspector D. Rao'
      }
    ]
  },
  {
    trackingId: 'TRK1020',
    customerName: 'Neha Kapoor',
    customerPhone: '+91 98190 22334',
    customerEmail: 'neha.k@example.com',
    sourceCity: 'Mumbai',
    destinationCity: 'Pune',
    currentLocation: 'Mumbai Nariman Point Center',
    currentStatus: 'Order Placed',
    estimatedDeliveryDate: '2026-10-09',
    createdAt: '2026-10-08T06:15:00.000Z',
    updatedAt: '2026-10-08T06:15:00.000Z',
    weightKg: 0.5,
    priority: 'Express',
    history: [
      {
        id: 'h-1020-1',
        timestamp: '2026-10-08T06:15:00.000Z',
        location: 'Mumbai Nariman Point Center',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Document envelope sealed. Awaiting courier pickup run.',
        operatorName: 'Staff Varun S.'
      }
    ]
  },
  {
    trackingId: 'TRK1021',
    customerName: 'Siddharth Rao',
    customerPhone: '+91 97410 55667',
    customerEmail: 'siddharth.r@example.com',
    sourceCity: 'Bengaluru',
    destinationCity: 'Delhi NCR',
    currentLocation: 'Delhi Mahipalpur Facility',
    currentStatus: 'Out for Delivery',
    estimatedDeliveryDate: '2026-10-08',
    createdAt: '2026-10-06T08:00:00.000Z',
    updatedAt: '2026-10-08T06:20:00.000Z',
    weightKg: 1.9,
    priority: 'Priority Overnight',
    history: [
      {
        id: 'h-1021-1',
        timestamp: '2026-10-06T08:00:00.000Z',
        location: 'Bengaluru MG Road Kiosk',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Confidential corporate package.',
        operatorName: 'Staff C. Nair'
      },
      {
        id: 'h-1021-2',
        timestamp: '2026-10-06T13:30:00.000Z',
        location: 'BLR Mega Hub Intake',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Scanned at air terminal.',
        operatorName: 'Driver Manjunath'
      },
      {
        id: 'h-1021-3',
        timestamp: '2026-10-06T22:00:00.000Z',
        location: 'BLR Gateway Air Hub',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Air bill attached for flight AI-506.',
        operatorName: 'Air Sorter Harish G.'
      },
      {
        id: 'h-1021-4',
        timestamp: '2026-10-07T12:00:00.000Z',
        location: 'DEL Mega Hub Terminal 3',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Arrived IGI cargo terminal. Transferred to South Delhi station.',
        operatorName: 'Agent Rohit P.'
      },
      {
        id: 'h-1021-5',
        timestamp: '2026-10-08T06:20:00.000Z',
        location: 'Delhi Mahipalpur Facility',
        previousStatus: 'In Transit',
        newStatus: 'Out for Delivery',
        notes: 'Courier executive Balram out for delivery in South Delhi.',
        operatorName: 'Executive Balram Y.'
      }
    ]
  },
  {
    trackingId: 'TRK1022',
    customerName: 'Pooja Hegde',
    customerPhone: '+91 98860 33445',
    customerEmail: 'pooja.h@example.com',
    sourceCity: 'Mangaluru',
    destinationCity: 'Bengaluru',
    currentLocation: 'Bengaluru Jayanagar Hub',
    currentStatus: 'Delivered',
    estimatedDeliveryDate: '2026-10-07',
    createdAt: '2026-10-05T10:00:00.000Z',
    updatedAt: '2026-10-07T18:00:00.000Z',
    weightKg: 2.8,
    priority: 'Standard',
    history: [
      {
        id: 'h-1022-1',
        timestamp: '2026-10-05T10:00:00.000Z',
        location: 'Mangaluru Hampankatta Hub',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Consignment packaged.',
        operatorName: 'Staff Preetham K.'
      },
      {
        id: 'h-1022-2',
        timestamp: '2026-10-05T16:00:00.000Z',
        location: 'Mangaluru Port Depot',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Loaded on Hassan-Bangalore highway route.',
        operatorName: 'Driver Santhosh'
      },
      {
        id: 'h-1022-3',
        timestamp: '2026-10-06T04:00:00.000Z',
        location: 'BLR Mega Hub Peenya',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Automated sorting completed.',
        operatorName: 'Supervisor Ramesh G.'
      },
      {
        id: 'h-1022-4',
        timestamp: '2026-10-06T20:00:00.000Z',
        location: 'Bengaluru Jayanagar Hub',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Feeder van transfer.',
        operatorName: 'Driver Shashi'
      },
      {
        id: 'h-1022-5',
        timestamp: '2026-10-07T09:00:00.000Z',
        location: 'Bengaluru Jayanagar Hub',
        previousStatus: 'In Transit',
        newStatus: 'Out for Delivery',
        notes: 'Assigned to courier Kiran.',
        operatorName: 'Courier Kiran M.'
      },
      {
        id: 'h-1022-6',
        timestamp: '2026-10-07T18:00:00.000Z',
        location: 'Bengaluru Jayanagar Hub',
        previousStatus: 'Out for Delivery',
        newStatus: 'Delivered',
        notes: 'Customer accepted delivery. Verification completed.',
        operatorName: 'Courier Kiran M.'
      }
    ]
  },
  {
    trackingId: 'TRK1023',
    customerName: 'Deepak Joshi',
    customerPhone: '+91 97110 99887',
    customerEmail: 'deepak.j@example.com',
    sourceCity: 'Delhi NCR',
    destinationCity: 'Chennai',
    currentLocation: 'Bhopal Central Hub',
    currentStatus: 'In Transit',
    estimatedDeliveryDate: '2026-10-11',
    createdAt: '2026-10-07T07:00:00.000Z',
    updatedAt: '2026-10-08T04:40:00.000Z',
    weightKg: 5.0,
    priority: 'Standard',
    history: [
      {
        id: 'h-1023-1',
        timestamp: '2026-10-07T07:00:00.000Z',
        location: 'Delhi Anand Vihar Counter',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Standard freight parcel.',
        operatorName: 'Staff Pankaj S.'
      },
      {
        id: 'h-1023-2',
        timestamp: '2026-10-07T12:00:00.000Z',
        location: 'DEL Mega Hub Terminal 3',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Palletized for interstate container.',
        operatorName: 'Driver Arvind'
      },
      {
        id: 'h-1023-3',
        timestamp: '2026-10-07T21:30:00.000Z',
        location: 'DEL Mega Hub Terminal 3',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Sorted into South line-haul convoy.',
        operatorName: 'Operator Neeraj P.'
      },
      {
        id: 'h-1023-4',
        timestamp: '2026-10-08T04:40:00.000Z',
        location: 'Bhopal Central Hub',
        previousStatus: 'At Sorting Center',
        newStatus: 'In Transit',
        notes: 'Intermediate stop scan. Continuing on NH-46 towards Nagpur/Chennai.',
        operatorName: 'Inspector Mukesh R.'
      }
    ]
  },
  {
    trackingId: 'TRK1024',
    customerName: 'Zoya Khan',
    customerPhone: '+91 98920 12345',
    customerEmail: 'zoya.k@example.com',
    sourceCity: 'Mumbai',
    destinationCity: 'Hyderabad',
    currentLocation: 'Mumbai Bandra West Terminal',
    currentStatus: 'Picked Up',
    estimatedDeliveryDate: '2026-10-10',
    createdAt: '2026-10-08T03:00:00.000Z',
    updatedAt: '2026-10-08T05:55:00.000Z',
    weightKg: 1.7,
    priority: 'Express',
    history: [
      {
        id: 'h-1024-1',
        timestamp: '2026-10-08T03:00:00.000Z',
        location: 'Mumbai Bandra West Terminal',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'Online booking generated.',
        operatorName: 'Staff A. Merchant'
      },
      {
        id: 'h-1024-2',
        timestamp: '2026-10-08T05:55:00.000Z',
        location: 'Mumbai Bandra West Terminal',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Collected by hub dispatch van for BOM Sorting Center.',
        operatorName: 'Courier Raju N.'
      }
    ]
  },
  {
    trackingId: 'TRK1025',
    customerName: 'Abhishek Saxena',
    customerPhone: '+91 98100 88990',
    customerEmail: 'abhishek.s@example.com',
    sourceCity: 'Delhi NCR',
    destinationCity: 'Bengaluru',
    currentLocation: 'DEL Mega Hub Terminal 3',
    currentStatus: 'At Sorting Center',
    estimatedDeliveryDate: '2026-10-09',
    createdAt: '2026-10-07T15:20:00.000Z',
    updatedAt: '2026-10-08T03:40:00.000Z',
    weightKg: 2.2,
    priority: 'Priority Overnight',
    history: [
      {
        id: 'h-1025-1',
        timestamp: '2026-10-07T15:20:00.000Z',
        location: 'Delhi Connaught Place Hub',
        previousStatus: 'Initial',
        newStatus: 'Order Placed',
        notes: 'High-priority business document packet.',
        operatorName: 'Staff Sandeep B.'
      },
      {
        id: 'h-1025-2',
        timestamp: '2026-10-07T20:10:00.000Z',
        location: 'Delhi NCR Gateway Intake',
        previousStatus: 'Order Placed',
        newStatus: 'Picked Up',
        notes: 'Transferred via rapid courier dispatch.',
        operatorName: 'Rider Harish T.'
      },
      {
        id: 'h-1025-3',
        timestamp: '2026-10-08T03:40:00.000Z',
        location: 'DEL Mega Hub Terminal 3',
        previousStatus: 'Picked Up',
        newStatus: 'At Sorting Center',
        notes: 'Placed in FIFO Sorting Center Queue for flight BLR-601 loading.',
        operatorName: 'Hub Inspector Vinod K.'
      }
    ]
  }
];
