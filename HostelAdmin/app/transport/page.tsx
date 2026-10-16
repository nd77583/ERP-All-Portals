"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// ==========================================
// 1. TYPES & DATA INTERFACES
// ==========================================
export interface TelemetryFeed {
  id: string;
  regNo: string;
  vehicleName: string;
  currentSector: string;
  speed: string;
  fuel: string;
  manifest: string;
  adherence: string;
  adherenceType: "on-schedule" | "convoy-lock" | "slow-traffic" | "idle";
  corridor: "Patiala-State" | "IGI Delhi Airport" | "Mohali HPC" | "Campus Internal";
  lat?: number;
  lng?: number;
}

export interface TournamentDocket {
  tripId: string;
  title: string;
  status:
    | "Sanctioned & Dispatched"
    | "Dean Sports Cleared"
    | "Under Transit Review"
    | "Sanctioned & Scheduled";
  destination: string;
  distance: string;
  squadLead: string;
  department: string;
  assignedConveyance: string;
  driver: string;
  athletesCount: number;
  gearManifest: string;
  registrarSanction: string;
  eSignAuth: string;
  departureTime: string;
  expectedReturn: string;
  isUpcoming?: boolean;
}

export interface FleetHealthRecord {
  regNo: string;
  model: string;
  rtoFitnessDate: string;
  insuranceDate: string;
  odometer: string;
  alert: string;
  alertType: "ok" | "warning" | "urgent";
}

export interface CommuterRoute {
  routeNumber: string;
  routeName: string;
  occupiedSeats: number;
  totalSeats: number;
  percentage: number;
  vehicleReg: string;
  passDetails: string;
  statusTag: string;
}

export interface DriverRosterEntry {
  driverId: string;
  initials: string;
  name: string;
  shift: string;
  bacReading: string;
  bacTime: string;
  licenseInfo: string;
  statusOk: boolean;
}

export interface ActiveBroadcast {
  id: string;
  title: string;
  message: string;
  route: string;
  timestamp: string;
  priority: "High" | "Normal" | "Urgent";
}

// ==========================================
// 2. MODAL COMPONENTS
// ==========================================

// --- Requisition Tournament Bus Modal (FR-TRN-05) ---
interface RequisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (docket: TournamentDocket) => void;
}

function RequisitionModal({ isOpen, onClose, onSubmit }: RequisitionModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    distance: "180 km (One Way)",
    squadLead: "",
    department: "Dept. of Athletics & Sports Science",
    vehicleType: "Coach (42-Seater)",
    driverName: "Pending Roster Allocation",
    athletesCount: 24,
    gearManifest: "Standard Kits & Recovery Gear",
    departureTime: "06:00 IST",
    expectedReturn: "20:00 IST",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.destination) return;

    const newDocket: TournamentDocket = {
      tripId: `TRN-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      status: "Under Transit Review",
      destination: formData.destination,
      distance: formData.distance,
      squadLead: formData.squadLead || "Sports Officer In-charge",
      department: formData.department,
      assignedConveyance: `${formData.vehicleType} PB-11-AC-${Math.floor(1000 + Math.random() * 9000)}`,
      driver: formData.driverName,
      athletesCount: Number(formData.athletesCount),
      gearManifest: formData.gearManifest,
      registrarSanction: `REG/SPORTS/TRANS/${Math.floor(7000 + Math.random() * 2000)}/2026`,
      eSignAuth: "PENDING-DIRECTORATE",
      departureTime: formData.departureTime,
      expectedReturn: formData.expectedReturn,
      isUpcoming: true,
    };

    onSubmit(newDocket);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-[#cbd5e1] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#001229] px-6 py-4 flex items-center justify-between text-white border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#ff9f2d] text-[#663500] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                FR-TRN-05 Requisition
              </span>
              <span className="text-xs text-[#94a3b8] font-mono">
                Statutory Directorate Form
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Requisition Tournament & Official Transit Bus
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-xs text-[#475569]">
            <strong>Statutory Rule PMVR-1989 & Directorate SOP:</strong> All extramural transit requisitions must include athlete count, sports directorate clearance, and registered vehicle telemetry compliance.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Tournament / Event Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. North Zone Inter-Varsity Athletics"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#00664f] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Destination Campus / Stadium *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. GNDU Amritsar / Punjabi Univ."
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#00664f] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Squad / Faculty In-Charge
              </label>
              <input
                type="text"
                placeholder="Coach / Official Name"
                value={formData.squadLead}
                onChange={(e) => setFormData({ ...formData, squadLead: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#00664f] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#00664f] focus:outline-none bg-white"
              >
                <option>Dept. of Track & Field</option>
                <option>Dept. of Combat Sports (Boxing/Wrestling)</option>
                <option>Dept. of Weightlifting & Powerlifting</option>
                <option>Dept. of Aquatic Sports</option>
                <option>Academic & Administrative Council</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Athlete & Official Count
              </label>
              <input
                type="number"
                min={1}
                max={60}
                value={formData.athletesCount}
                onChange={(e) => setFormData({ ...formData, athletesCount: Number(e.target.value) })}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#00664f] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Vehicle Category Requested
              </label>
              <select
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#00664f] focus:outline-none bg-white"
              >
                <option>Coach (42-Seater Tata LPO)</option>
                <option>Force Traveller (26-Seater AC)</option>
                <option>Gear & Equipment Mini-Van</option>
                <option>VIP Delegate Shuttle</option>
                <option>Ambulance ALS Unit</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Departure Date & Time
              </label>
              <input
                type="text"
                placeholder="e.g. 02 Mar 2026, 05:30 IST"
                value={formData.departureTime}
                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#00664f] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Expected Return
              </label>
              <input
                type="text"
                placeholder="e.g. 04 Mar 2026, 21:00 IST"
                value={formData.expectedReturn}
                onChange={(e) => setFormData({ ...formData, expectedReturn: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#00664f] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102d4d] mb-1">
              Sports Gear & Equipment Manifest
            </label>
            <textarea
              rows={2}
              placeholder="e.g. 14 Vault/Throw Kits, 2 Medical Physio Ice-Baths, 1 Video Biomechanics Rig"
              value={formData.gearManifest}
              onChange={(e) => setFormData({ ...formData, gearManifest: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#00664f] focus:outline-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f1f5f9] rounded border border-[#cbd5e1] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#001229] hover:bg-[#062344] rounded shadow transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#7ff0c9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submit Statutory Requisition
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Log Maintenance & Fuel Modal (FR-TRN-02) ---
interface LogMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (log: {
    vehicle: string;
    type: string;
    odometer: string;
    fuelLitres: string;
    amount: string;
    vendor: string;
    notes: string;
  }) => void;
}

function LogMaintenanceModal({ isOpen, onClose, onSubmit }: LogMaintenanceModalProps) {
  const [vehicle, setVehicle] = useState("PB-11-AA-4091 (Tata LPO 1618)");
  const [type, setType] = useState("Bio-Diesel / Fuel Refill");
  const [odometer, setOdometer] = useState("64,350");
  const [fuelLitres, setFuelLitres] = useState("120");
  const [amount, setAmount] = useState("10,800");
  const [vendor, setVendor] = useState("HPCL Automated SmartFleet Card");
  const [notes, setNotes] = useState("Regular convoy top-up before inter-varsity trip");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ vehicle, type, odometer, fuelLitres, amount, vendor, notes });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-lg shadow-2xl border border-[#cbd5e1] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#102d4d] px-6 py-4 flex items-center justify-between text-white border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#dce8fb] text-[#102d4d] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                FR-TRN-02 Telematics & Fuel
              </span>
              <span className="text-xs text-[#94a3b8] font-mono">
                Vaahan & HPCL Fleet Gateway
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Log Vehicle Maintenance / Fuel Record
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="p-3 bg-[#e8f0ff] border border-[#c5d8f7] rounded-md text-xs text-[#102d4d]">
            <strong>Statutory Rule FR-TRN-02:</strong> All fuel draws and maintenance interventions must sync with odometer telemetry and institutional FASTag / HPCL petroleum fleet credentials.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Select Vehicle *
              </label>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#102d4d] focus:outline-none bg-white"
              >
                <option>PB-11-AA-4091 (Tata LPO 1618)</option>
                <option>PB-11-B-2012 (Force Traveller ALS)</option>
                <option>PB-11-AC-9088 (Mahindra Bolero Maxi)</option>
                <option>PB-11-CZ-1104 (Eicher Starline 32-S)</option>
                <option>PB-11-AA-7712 (Tata Starbus Route 02)</option>
                <option>PB-11-AC-3101 (Swaraj Mazda Route 03)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Entry Category *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#102d4d] focus:outline-none bg-white"
              >
                <option>Bio-Diesel / Fuel Refill</option>
                <option>Scheduled PM (5,000 km Service)</option>
                <option>Brake Pad & Lining Replacement</option>
                <option>Oxygen Cylinder & ALS Calibration</option>
                <option>Tyre Pressure & Alignment</option>
                <option>Pollution (PUC) & Vaahan Fitness Sync</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Current Odometer (km)
              </label>
              <input
                type="text"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#102d4d] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Fuel Litres / Qty
              </label>
              <input
                type="text"
                value={fuelLitres}
                onChange={(e) => setFuelLitres(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#102d4d] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Amount (₹ INR)
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#102d4d] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102d4d] mb-1">
              Gateway / Vendor Reference
            </label>
            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#102d4d] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102d4d] mb-1">
              Workshop / Maintenance Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#102d4d] focus:outline-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f1f5f9] rounded border border-[#cbd5e1] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-[#102d4d] bg-[#dce8fb] hover:bg-[#c5d8f7] rounded border border-[#a8c6f2] shadow transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#102d4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Save Record & Sync Vaahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Dispatch Broadcast Modal (FR-TRN-07) ---
interface DispatchBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (broadcast: ActiveBroadcast) => void;
}

function DispatchBroadcastModal({ isOpen, onClose, onSubmit }: DispatchBroadcastModalProps) {
  const [route, setRoute] = useState("All Active Fleet & Commuter Routes");
  const [priority, setPriority] = useState<"High" | "Normal" | "Urgent">("High");
  const [title, setTitle] = useState("Traffic Delay Warning: NH-44 Toll Plaza");
  const [message, setMessage] = useState(
    "Heavy tractor rally diverted via Rajpura bypass. Expect +15m delay for Route 01 and Route 03 evening drop-offs."
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    onSubmit({
      id: `BC-${Date.now()}`,
      title,
      message,
      route,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      priority,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-lg shadow-2xl border border-[#cbd5e1] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#062344] px-6 py-4 flex items-center justify-between text-white border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#ff4d4f] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                FR-TRN-07 Live Telematics Broadcast
              </span>
              <span className="text-xs text-[#94a3b8] font-mono">
                SMS / Push / Portal Notification
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Dispatch Route Delay & Safety Broadcast
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="p-3 bg-[#fff7e6] border border-[#ffd591] rounded-md text-xs text-[#d46b08]">
            <strong>Urgent Statutory Notice (FR-TRN-07):</strong> Dispatches will immediately push live notifications to the student portal, athlete captains, drivers&apos; telemetry units, and registrar travel log.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Target Route / Corridor *
              </label>
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#062344] focus:outline-none bg-white"
              >
                <option>All Active Fleet & Commuter Routes</option>
                <option>Route 01 • Patiala Cantt & Urban Estate</option>
                <option>Route 02 • Nabha Road & Polo Ground</option>
                <option>Route 03 • Rajpura Regional Shuttle</option>
                <option>Tournament Convoy • GNDU Amritsar (TRN-2026-080)</option>
                <option>All Medical & Standby Vehicles</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102d4d] mb-1">
                Priority Tier
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "High" | "Normal" | "Urgent")}
                className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#062344] focus:outline-none bg-white"
              >
                <option value="High">High (Advisory & Reroute)</option>
                <option value="Urgent">Urgent (Weather / Breakdown / Safety)</option>
                <option value="Normal">Normal (Routine ETA Update)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102d4d] mb-1">
              Broadcast Headline *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#062344] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102d4d] mb-1">
              Broadcast Message Content *
            </label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-[#cbd5e1] rounded focus:ring-2 focus:ring-[#062344] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs text-[#64748b]">
            <input
              type="checkbox"
              id="notifySms"
              defaultChecked
              className="rounded text-[#062344] focus:ring-0"
            />
            <label htmlFor="notifySms" className="cursor-pointer">
              Send statutory SMS alert to registered athlete guardians & drivers
            </label>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f1f5f9] rounded border border-[#cbd5e1] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#062344] hover:bg-[#0a315e] rounded shadow transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#ff9f2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Transmit Live Broadcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Digital Gate Pass Modal (FR-TRN-05) ---
interface GatePassModalProps {
  isOpen: boolean;
  onClose: () => void;
  docket: TournamentDocket;
}

function GatePassModal({ isOpen, onClose, docket }: GatePassModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-[#cbd5e1] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Pass Top Banner */}
        <div className="bg-[#001229] px-6 py-3 flex items-center justify-between text-white border-b border-[#1e293b]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7ff0c9] animate-pulse"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#7ff0c9] uppercase">
              STATUTORY E-GATE PASS • PMVR-1989 & SPORTS DIRECTORATE
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Printable Pass Body */}
        <div className="p-6 overflow-y-auto space-y-4 bg-white text-[#102d4d]">
          {/* University Seal & Title */}
          <div className="text-center pb-4 border-b-2 border-dashed border-[#cbd5e1]">
            <div className="inline-block px-3 py-1 bg-[#dce7fa] text-[#102d4d] text-[11px] font-extrabold uppercase rounded tracking-wider mb-1">
              Maharaja Bhupinder Singh Punjab Sports University, Patiala
            </div>
            <h2 className="text-xl font-black tracking-tight text-[#102d4d]">
              OFFICIAL VEHICLE TRANSIT GATE PASS & MANIFEST
            </h2>
            <p className="text-xs text-[#64748b] font-medium">
              Established under Punjab Act No. 11 of 2019 • Main Campus Bhadson Road
            </p>
          </div>

          {/* Barcode & Pass ID Row */}
          <div className="flex flex-wrap items-center justify-between bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0]">
            <div>
              <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                DOCKET ID / PASS NUMBER
              </span>
              <span className="text-base font-extrabold text-[#102d4d] font-mono">
                {docket.tripId}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                STATUTORY DISPATCH STATUS
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00664f] bg-[#e8f8f2] px-2.5 py-1 rounded-full border border-[#a3e8cc]">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {docket.status}
              </span>
            </div>
          </div>

          {/* Pass Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 bg-[#f1f5f9] rounded border border-[#e2e8f0]">
              <span className="text-[10px] font-bold text-[#64748b] uppercase block">
                Destination & Event
              </span>
              <span className="font-bold text-[#102d4d] block mt-0.5">
                {docket.destination}
              </span>
              <span className="text-[11px] text-[#475569]">{docket.title}</span>
            </div>

            <div className="p-2.5 bg-[#f1f5f9] rounded border border-[#e2e8f0]">
              <span className="text-[10px] font-bold text-[#64748b] uppercase block">
                Assigned Vehicle
              </span>
              <span className="font-bold text-[#102d4d] block mt-0.5">
                {docket.assignedConveyance}
              </span>
              <span className="text-[11px] text-[#475569]">
                GPS AIS-140 Governed (65 km/h)
              </span>
            </div>

            <div className="p-2.5 bg-[#f1f5f9] rounded border border-[#e2e8f0]">
              <span className="text-[10px] font-bold text-[#64748b] uppercase block">
                Driver & Safety
              </span>
              <span className="font-bold text-[#102d4d] block mt-0.5">
                {docket.driver}
              </span>
              <span className="text-[11px] text-[#00664f] font-semibold">
                ✓ BAC: 0.00% Verified
              </span>
            </div>

            <div className="p-2.5 bg-[#f1f5f9] rounded border border-[#e2e8f0]">
              <span className="text-[10px] font-bold text-[#64748b] uppercase block">
                Squad & Faculty Lead
              </span>
              <span className="font-bold text-[#102d4d] block mt-0.5">
                {docket.squadLead}
              </span>
              <span className="text-[11px] text-[#475569]">{docket.department}</span>
            </div>

            <div className="p-2.5 bg-[#f1f5f9] rounded border border-[#e2e8f0]">
              <span className="text-[10px] font-bold text-[#64748b] uppercase block">
                Athletes Onboard
              </span>
              <span className="font-bold text-[#102d4d] block mt-0.5">
                {docket.athletesCount} Athletes + Faculty
              </span>
              <span className="text-[11px] text-[#00664f] font-semibold">
                Verified SIS Roster
              </span>
            </div>

            <div className="p-2.5 bg-[#f1f5f9] rounded border border-[#e2e8f0]">
              <span className="text-[10px] font-bold text-[#64748b] uppercase block">
                Timings
              </span>
              <span className="font-bold text-[#102d4d] block mt-0.5">
                Dep: {docket.departureTime}
              </span>
              <span className="text-[11px] text-[#475569]">
                Ret: {docket.expectedReturn}
              </span>
            </div>
          </div>

          {/* Equipment Manifest */}
          <div className="p-3 bg-[#e8f0ff] border border-[#c5d8f7] rounded-lg">
            <span className="text-[10px] font-bold text-[#102d4d] uppercase tracking-wider block mb-1">
              Statutory Equipment & Gear Manifest
            </span>
            <p className="text-xs font-medium text-[#102d4d]">
              {docket.gearManifest}
            </p>
          </div>

          {/* Signatures & Security Stamp */}
          <div className="pt-3 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between text-xs text-[#64748b] gap-2">
            <div className="space-y-0.5">
              <div className="font-mono text-[11px] text-[#102d4d] font-bold">
                {docket.registrarSanction}
              </div>
              <div className="text-[10px] text-[#00664f] font-semibold">
                ✓ Cryptographically Verified: {docket.eSignAuth}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block border-2 border-[#102d4d] text-[#102d4d] px-3 py-1 font-bold text-[10px] rounded uppercase tracking-widest">
                MAIN GATE SECURITY CLEARED
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#f8fafc] px-6 py-3 border-t border-[#e2e8f0] flex items-center justify-between">
          <span className="text-[11px] text-[#64748b]">
            Present this e-Pass at Campus Main Gate #01 for turnstile exit.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-bold text-[#102d4d] bg-[#dce8fb] hover:bg-[#c5d8f7] rounded border border-[#a8c6f2] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Gate Pass
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#001229] hover:bg-[#062344] rounded transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. PAGE SECTION COMPONENTS
// ==========================================

// --- Section 1: Header ---
interface TransportHeaderProps {
  onOpenRequisition: () => void;
  onOpenLogMaintenance: () => void;
  onOpenBroadcast: () => void;
}

function TransportHeader({
  onOpenRequisition,
  onOpenLogMaintenance,
  onOpenBroadcast,
}: TransportHeaderProps) {
  const [syncTime, setSyncTime] = useState(1.2);

  // Live AIS-140 GPS ping counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncTime(parseFloat((0.8 + Math.random() * 0.7).toFixed(1)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-lg bg-[#eef3ff] border border-[#d6e3fb] p-4 sm:p-5 lg:p-6 mb-5 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        {/* Left Column: Titles & Badges */}
        <div className="flex-1 min-w-0">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-[3px] bg-[#001229] px-2.5 py-1 font-['Inter',sans-serif] text-[10px] font-bold leading-tight tracking-[0.5px] text-white uppercase shadow-xs">
              SUITE F • FR-TRN-01/07
            </span>

            <span className="rounded-[3px] bg-[#dce7fa] px-2.5 py-1 font-['Inter',sans-serif] text-[10px] font-bold leading-tight tracking-[0.5px] text-[#29466d] uppercase border border-[#c5d8f7]">
              Punjab Motor Vehicles Rules (PMVR-1989) Compliant
            </span>
          </div>

          {/* AIS-140 GPS Telematics Server Status */}
          <div className="mt-2.5 inline-flex items-center gap-2 rounded-[3px] bg-[#00664f] px-2.5 py-1 text-white shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7ff0c9] animate-pulse"></span>
            <span className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] font-bold tracking-[0.3px] text-[#7ff0c9]">
              • AIS-140 GPS Server: Sync {syncTime}s
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mt-2.5 font-['Public_Sans',sans-serif] text-[20px] sm:text-[23px] lg:text-[25px] font-bold leading-tight tracking-[-0.5px] text-[#102d4d]">
            Campus Transport, GPS Fleet &amp; Tournament Transit Hub
          </h1>

          {/* Subtitle */}
          <p className="mt-1 font-['Inter',sans-serif] text-[12px] sm:text-[13px] leading-relaxed text-[#596979] max-w-3xl">
            Live Telematics &amp; GPS Fleet Radar, Athlete Tournament Transit Requisitions, Vehicle Fitness &amp; Route Optimization
          </p>
        </div>

        {/* Right Column: Statutory Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-1.5 sm:gap-2.5 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* Button 1: Requisition Tournament Bus */}
            <button
              onClick={onOpenRequisition}
              type="button"
              className="inline-flex h-[28px] sm:h-[34px] lg:h-[36px] items-center gap-1.5 sm:gap-2 rounded-[3px] sm:rounded-[4px] bg-[#ff9f2d] hover:bg-[#f59220] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0px_6px_16px_rgba(0,18,41,0.14)] active:scale-[0.98] active:translate-y-0 px-2 sm:px-2.5 lg:px-3 font-['Inter',sans-serif] text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold text-[#663500] leading-none transition-all duration-200 ease-out shadow-xs cursor-pointer"
            >
              <Image
                src="/Container (18).png"
                alt="Bus"
                width={14}
                height={14}
                className="object-contain w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
              />
              Requisition Tournament Bus
            </button>

            {/* Button 2: Log Maintenance / Fuel */}
            <button
              onClick={onOpenLogMaintenance}
              type="button"
              className="inline-flex h-[28px] sm:h-[34px] lg:h-[36px] items-center gap-1.5 sm:gap-2 rounded-[3px] sm:rounded-[4px] bg-[#dce8fb] hover:bg-[#ccdcf5] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0px_6px_16px_rgba(0,18,41,0.14)] active:scale-[0.98] active:translate-y-0 px-2 sm:px-2.5 lg:px-3 font-['Inter',sans-serif] text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold text-[#102d4d] leading-none border border-[#c0d5f5] transition-all duration-200 ease-out shadow-xs cursor-pointer"
            >
              <Image
                src="/Container (20).png"
                alt="Gas"
                width={14}
                height={14}
                className="object-contain w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
              />
              Log Maintenance / Fuel
            </button>
          </div>

          {/* Button 3: Dispatch Route Broadcast */}
          <button
            onClick={onOpenBroadcast}
            type="button"
            className="inline-flex h-[28px] sm:h-[34px] lg:h-[36px] items-center gap-1.5 sm:gap-2 rounded-[3px] sm:rounded-[4px] bg-[#062344] hover:bg-[#0c3361] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0px_6px_16px_rgba(0,18,41,0.14)] active:scale-[0.98] active:translate-y-0 px-2 sm:px-2.5 lg:px-3 font-['Inter',sans-serif] text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold text-white leading-none transition-all duration-200 ease-out shadow-xs cursor-pointer"
          >
            <Image
              src="/Container (21).png"
              alt="Tower"
              width={14}
              height={14}
              className="object-contain w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
            />
            Dispatch Route Broadcast
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Section 2: Metric Cards ---
function TransportMetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      {/* CARD 1: Total Fleet */}
      <div className="flex min-h-[148px] h-full flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#102d4d] bg-white p-3 sm:p-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-['Inter',sans-serif] text-[10px] font-bold tracking-[0.5px] text-[#596979] uppercase">
                TOTAL UNIVERSITY FLEET
              </h3>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-['Public_Sans',sans-serif] text-[22px] sm:text-[24px] font-extrabold text-[#102d4d] leading-none">
                  18
                </span>
                <span className="text-[13px] font-semibold text-[#596979]">
                  Vehicles
                </span>
              </div>
            </div>
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[#e8f0ff]">
              <Image
                src="/Icon (6).png"
                alt="Fleet"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
          </div>

          {/* Ratio bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#102d4d] mb-1">
              <span>8 Coaches (42-Seater)</span>
              <span className="font-bold">44%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden flex">
              <div className="h-full bg-[#102d4d] w-[44%]" title="Coaches 44%"></div>
              <div className="h-full bg-[#ff9f2d] w-[22%]" title="Gear Vans 22%"></div>
              <div className="h-full bg-[#64748b] w-[34%]" title="Shuttles 34%"></div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-3 flex items-center justify-between text-[10px] font-medium text-[#64748b] pt-2 border-t border-[#f1f5f9]">
          <span>4 Gear/Physio Vans</span>
          <span>6 Shuttles</span>
        </div>
      </div>

      {/* CARD 2: Vehicles On Live Route */}
      <div className="flex min-h-[148px] h-full flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#28a978] bg-white p-3 sm:p-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-['Inter',sans-serif] text-[10px] font-bold tracking-[0.5px] text-[#596979] uppercase">
                VEHICLES ON LIVE ROUTE
              </h3>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-['Public_Sans',sans-serif] text-[22px] sm:text-[24px] font-extrabold text-[#102d4d] leading-none">
                  7
                </span>
                <span className="text-[13px] font-semibold text-[#00664f]">
                  En Route
                </span>
              </div>
            </div>
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[#e8f8f2]">
              <Image
                src="/Icon (7).png"
                alt="GPS Live"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
          </div>

          {/* Active telemetry progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#00664f] mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#28a978] animate-ping"></span>
                Active AIS-140 Convoy
              </span>
              <span>100%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#e8f8f2] overflow-hidden">
              <div className="h-full bg-[#28a978] rounded-full w-full"></div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-[#102d4d] pt-2 border-t border-[#f1f5f9]">
          <span className="text-[#00664f]">Telemetry 100% Active</span>
          <span className="text-[#596979]">0 AIS-140 Packet Loss</span>
        </div>
      </div>

      {/* CARD 3: Statutory Fitness & PUC */}
      <div className="flex min-h-[148px] h-full flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#FE932C] bg-white p-3 sm:p-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-['Inter',sans-serif] text-[10px] font-bold tracking-[0.5px] text-[#596979] uppercase">
                STATUTORY FITNESS &amp; PUC
              </h3>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-['Public_Sans',sans-serif] text-[22px] sm:text-[24px] font-extrabold text-[#102d4d] leading-none">
                  100%
                </span>
                <span className="text-[13px] font-semibold text-[#663500]">
                  Certified
                </span>
              </div>
            </div>
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[#e8f0ff]">
              <Image
                src="/Icon (8).png"
                alt="Fitness & Shield"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
          </div>

          {/* Fitness Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#663500] mb-1">
              <span>All 18 Vehicles Valid</span>
              <span>0 Expired</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#fff4e5] overflow-hidden">
              <div className="h-full bg-[#ff9f2d] rounded-full w-full"></div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-[#102d4d] pt-2 border-t border-[#f1f5f9]">
          <span>Zero Expired RTO Permits</span>
          <span className="px-1.5 py-0.5 rounded bg-[#e8f0ff] text-[#28568f] text-[9.5px] border border-[#c5d8f7]">
            Vaahan Sync: OK
          </span>
        </div>
      </div>

      {/* CARD 4: Monthly Transit Run & Fuel */}
      <div className="flex min-h-[148px] h-full flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#102d4d] bg-white p-3 sm:p-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-['Inter',sans-serif] text-[10px] font-bold tracking-[0.5px] text-[#596979] uppercase">
                MONTHLY TRANSIT RUN &amp; FUEL
              </h3>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-['Public_Sans',sans-serif] text-[22px] sm:text-[24px] font-extrabold text-[#102d4d] leading-none">
                  14,820
                </span>
                <span className="text-[13px] font-semibold text-[#596979]">
                  km
                </span>
              </div>
            </div>
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[#e8f0ff]">
              <Image
                src="/Icon (9).png"
                alt="Fuel & Trip"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
          </div>

          {/* Efficiency Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#596979] mb-1">
              <span>HPCL Institutional Quota</span>
              <span className="text-[#102d4d] font-bold">78%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden">
              <div className="h-full bg-[#102d4d] rounded-full w-[78%]"></div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-3 flex items-center justify-between text-[10px] font-semibold pt-2 border-t border-[#f1f5f9]">
          <span className="text-[#596979]">Avg 4.8 km/L</span>
          <span className="text-[#102d4d]">₹3.42 L (FASTag / HPCL)</span>
        </div>
      </div>
    </div>
  );
}

// --- Section 3: Live GPS Radar & Active Feed (FR-TRN-04) ---
function LiveGpsRadar() {
  const [selectedCorridor, setSelectedCorridor] = useState<string>("Patiala-State");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("PB-11-AA-4091");

  const telemetryData: TelemetryFeed[] = [
    {
      id: "V1",
      regNo: "PB-11-AA-4091",
      vehicleName: "Coach-A",
      currentSector: "Phagwara Bypass (NH-44)",
      speed: "62 km/h",
      fuel: "78% D-L",
      manifest: "36 Track Athl. + Coach",
      adherence: "On Schedule",
      adherenceType: "on-schedule",
      corridor: "Patiala-State",
    },
    {
      id: "V2",
      regNo: "PB-11-AC-9088",
      vehicleName: "Van-2",
      currentSector: "Sirhind Junction Feeder",
      speed: "48 km/h",
      fuel: "61% D-L",
      manifest: "14 Javelin/Shotput Kits",
      adherence: "Convoy Lock",
      adherenceType: "convoy-lock",
      corridor: "Patiala-State",
    },
    {
      id: "V3",
      regNo: "PB-11-CZ-1104",
      vehicleName: "Shuttle-1",
      currentSector: "Urban Estate Phase II",
      speed: "34 km/h",
      fuel: "84% D-L",
      manifest: "28 Student Day Scholars",
      adherence: "+4m Slow Traffic",
      adherenceType: "slow-traffic",
      corridor: "Patiala-State",
    },
    {
      id: "V4",
      regNo: "PB-11-AC-0004",
      vehicleName: "VIP-1",
      currentSector: "Ambala-Delhi Expressway",
      speed: "65 km/h",
      fuel: "91% D-L",
      manifest: "Council Delegation",
      adherence: "On Schedule",
      adherenceType: "on-schedule",
      corridor: "IGI Delhi Airport",
    },
    {
      id: "V5",
      regNo: "PB-11-AA-7712",
      vehicleName: "Coach-B",
      currentSector: "Zirakpur Flyover (Mohali)",
      speed: "52 km/h",
      fuel: "67% D-L",
      manifest: "HPC High Performance Batch",
      adherence: "On Schedule",
      adherenceType: "on-schedule",
      corridor: "Mohali HPC",
    },
  ];

  const filteredFeed =
    selectedCorridor === "All Corridors"
      ? telemetryData
      : telemetryData.filter((item) => item.corridor === selectedCorridor);

  const corridors = [
    "Patiala-State",
    "IGI Delhi Airport",
    "Mohali HPC",
    "All Corridors",
  ];

  return (
    <div className="w-full rounded-[8px] border border-[#e0e7f1] bg-white overflow-hidden shadow-xs mb-6">
      {/* CARD HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e0e7f1] bg-[#EFF4FF] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <Image
            src="/Icon00.png"
            alt="GPS Map Pin"
            width={16}
            height={16}
            className="object-contain"
          />
          <h2 className="font-['Inter',sans-serif] text-[14px] sm:text-[15px] font-bold tracking-[0.3px] text-[#102d4d]">
            FR-TRN-04: Live GPS Fleet Telematics Radar
          </h2>
        </div>

        {/* CORRIDOR SELECTOR TABS */}
        <div className="mt-2.5 sm:mt-0 flex items-center gap-1.5 flex-wrap">
          <span className="font-['Inter',sans-serif] text-[10px] font-bold text-[#596979] uppercase tracking-wider mr-1">
            CORRIDOR:
          </span>
          {corridors.map((c) => {
            const isActive = selectedCorridor === c;
            return (
              <button
                key={c}
                onClick={() => setSelectedCorridor(c)}
                type="button"
                className={`rounded-[4px] px-2.5 py-1 font-['Inter',sans-serif] text-[10.5px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#102d4d] text-white shadow-xs"
                    : "bg-white text-[#475569] border border-[#cbd5e1] hover:bg-[#f1f5f9]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* TELEMETRY STATUS PILLS BAR */}
      <div className="bg-[#0b1a2d] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          {/* Node 1 */}
          <div className="flex items-center gap-1.5 bg-[#142842] px-2.5 py-1 rounded-[4px] border border-[#1e3a5f]">
            <span className="font-bold text-[#94a3b8] uppercase tracking-wider text-[9.5px]">
              FLEET TELEMETRY PING:
            </span>
            <span className="flex items-center gap-1 font-bold text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ff0c9] animate-pulse"></span>
              14 Active Nodes
            </span>
          </div>

          {/* Node 2 */}
          <div className="flex items-center gap-1.5 bg-[#142842] px-2.5 py-1 rounded-[4px] border border-[#1e3a5f]">
            <span className="font-bold text-[#94a3b8] uppercase tracking-wider text-[9.5px]">
              ACTIVE SPEED SLA:
            </span>
            <span className="font-bold text-[#ff9f2d]">
              Max 65 km/h Governed
            </span>
          </div>

          {/* Node 3 */}
          <div className="flex items-center gap-1.5 bg-[#142842] px-2.5 py-1 rounded-[4px] border border-[#1e3a5f]">
            <span className="font-bold text-[#94a3b8] uppercase tracking-wider text-[9.5px]">
              GEOFENCE STATUS:
            </span>
            <span className="font-bold text-[#7ff0c9]">
              0 Breaches
            </span>
          </div>
        </div>

        <div className="text-[10px] text-[#94a3b8] font-mono flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-[#28a978]"></span>
          AIS-140 Certified Gateway
        </div>
      </div>

      {/* MAP VIEW CONTAINER WITH NORMAL GOOGLE MAP AND TELEMETRY OVERLAYS */}
      <div className="relative w-full h-[340px] sm:h-[370px] bg-[#eef2f6] overflow-hidden">
        {/* Normal GPS Map iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110180.69785705366!2d76.32647992391789!3d30.34677735618263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391028935a3313df%3A0xd5bc56ad3b90bc7f!2sPatiala%2C%20Punjab!5e0!3m2!1sen!2sin!4v1791453815030!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          title="GPS Radar Patiala"
        />

        {/* OVERLAY CHIP: En Route Vehicle (Coach-A) */}
        <div className="absolute top-4 right-4 z-10 max-w-[260px] bg-white/95 backdrop-blur-md rounded-[6px] border border-[#c5d8f7] p-2.5 shadow-lg text-xs pointer-events-auto transition-transform hover:scale-102">
          <div className="flex items-center justify-between gap-2 border-b border-[#f1f5f9] pb-1.5 mb-1.5">
            <span className="inline-flex items-center gap-1 rounded bg-[#00664f] px-1.5 py-0.5 text-[9.5px] font-bold text-[#7ff0c9]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ff0c9] animate-pulse"></span>
              En Route (62 km/h)
            </span>
            <span className="font-bold text-[#102d4d] text-[10px]">
              PB-11-AA-4091
            </span>
          </div>
          <div className="font-bold text-[#102d4d] text-[11px] truncate">
            Convoy Team • NH-44 Toll Bypass
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-[#596979]">
            <span>Driver: Harjit S.</span>
            <span className="font-semibold text-[#102d4d]">Pax: 36 Athletes</span>
          </div>
        </div>

        {/* OVERLAY CHIP: Standby Ambulance / Medical ALS Unit */}
        <div className="absolute bottom-16 left-4 z-10 bg-white/95 backdrop-blur-md rounded-[6px] border border-[#ffccd5] p-2 shadow-md text-xs pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#e11d48]"></span>
            <span className="font-bold text-[#b91c1c] text-[10.5px]">
              PB-11-B-2012 (ALS Unit)
            </span>
          </div>
          <div className="text-[10px] text-[#596979] mt-0.5">
            NIS Patiala Velodrome Standby
          </div>
        </div>

        {/* OVERLAY STRIP: MBSPSU Main Campus Depot */}
        <div className="absolute bottom-2 left-4 right-4 sm:right-auto z-10 bg-[#001229]/90 backdrop-blur-md text-white rounded-[5px] px-3 py-1.5 border border-[#1e293b] shadow-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff9f2d]"></span>
          <div>
            <span className="font-bold text-[10px] uppercase tracking-wide text-[#ff9f2d]">
              MBSPSU MAIN CAMPUS DEPOT
            </span>
            <p className="text-[9.5px] text-[#94a3b8] leading-tight">
              Central Motor Pool &amp; Bio-Diesel Refueling Bay (11 Stanchions Idle)
            </p>
          </div>
        </div>
      </div>

      {/* ACTIVE FLEET REAL-TIME FEED TABLE */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00664f] animate-ping"></span>
            <h3 className="font-['Inter',sans-serif] text-[11px] sm:text-[11.5px] font-bold text-[#102d4d] tracking-[0.5px] uppercase">
              ACTIVE FLEET REAL-TIME FEED (LAST PING &lt; 30S)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#64748b]">
            Showing {filteredFeed.length} telemetry streams
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#e2e8f0] text-[10px] font-bold text-[#596979] uppercase tracking-wider bg-[#f8fafc]">
                <th className="py-2.5 px-3">REG. NO. / VEHICLE</th>
                <th className="py-2.5 px-3">CURRENT SECTOR</th>
                <th className="py-2.5 px-3">SPEED &amp; FUEL</th>
                <th className="py-2.5 px-3">MANIFEST</th>
                <th className="py-2.5 px-3 text-right">ADHERENCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredFeed.map((row) => {
                const isSelected = selectedVehicleId === row.regNo;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedVehicleId(row.regNo)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-[#eef3ff]" : "hover:bg-[#f8fafc]"
                    }`}
                  >
                    {/* Reg No / Vehicle */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-bold text-[#102d4d] block">
                        {row.regNo}
                      </span>
                      <span className="text-[10.5px] text-[#596979]">
                        ({row.vehicleName})
                      </span>
                    </td>

                    {/* Current Sector */}
                    <td className="py-2.5 px-3 text-[#102d4d] font-medium whitespace-nowrap">
                      {row.currentSector}
                    </td>

                    {/* Speed & Fuel */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-semibold text-[#102d4d]">
                        {row.speed}
                      </span>
                      <span className="text-[#596979] ml-1.5">
                        • {row.fuel}
                      </span>
                    </td>

                    {/* Manifest */}
                    <td className="py-2.5 px-3 text-[#475569] whitespace-nowrap">
                      {row.manifest}
                    </td>

                    {/* Adherence Badge */}
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      {row.adherenceType === "on-schedule" && (
                        <span className="inline-block rounded-[3px] bg-[#00664f] px-2 py-0.5 text-[10px] font-bold text-[#7ff0c9]">
                          {row.adherence}
                        </span>
                      )}
                      {row.adherenceType === "convoy-lock" && (
                        <span className="inline-block rounded-[3px] bg-[#062344] px-2 py-0.5 text-[10px] font-bold text-white">
                          {row.adherence}
                        </span>
                      )}
                      {row.adherenceType === "slow-traffic" && (
                        <span className="inline-block rounded-[3px] bg-[#ff9f2d] px-2 py-0.5 text-[10px] font-bold text-[#663500]">
                          {row.adherence}
                        </span>
                      )}
                      {row.adherenceType === "idle" && (
                        <span className="inline-block rounded-[3px] bg-[#e2e8f0] px-2 py-0.5 text-[10px] font-bold text-[#475569]">
                          {row.adherence}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Section 4: Tournament Transit Dockets (FR-TRN-05) ---
interface TournamentTransitDocketsProps {
  onViewGatePass: (docket: TournamentDocket) => void;
  customDockets?: TournamentDocket[];
}

function TournamentTransitDockets({
  onViewGatePass,
  customDockets = [],
}: TournamentTransitDocketsProps) {
  // Main Active Dispatched Trip Docket
  const activeDocket: TournamentDocket = {
    tripId: "TRIP #TRN-2026-080",
    title: "All India Inter-University Athletics Championship",
    status: "Sanctioned & Dispatched",
    destination: "GNDU Amritsar Campus",
    distance: "Distance: 242 km (One Way)",
    squadLead: "Coach Balwinder Singh",
    department: "Dept. of Track & Field",
    assignedConveyance: "Coach PB-11-AA-4091",
    driver: "Driver: Harjit Singh (#DR-014)",
    athletesCount: 36,
    gearManifest: "14 Vault/Throw Kits Loaded",
    registrarSanction: "Registrar Sanction: REG/SPORTS/TRANS/8821/2026",
    eSignAuth: "+ e-Sign: VC-DIRECT-AUTH",
    departureTime: "05:30 IST",
    expectedReturn: "28 Feb 21:00",
  };

  // Upcoming Statutory Requests in Review
  const [upcomingRequests, setUpcomingRequests] = useState<
    Array<{
      id: string;
      title: string;
      subtitle: string;
      status: string;
      statusType: "cleared" | "review" | "sanctioned";
      sanctioned: boolean;
    }>
  >([
    {
      id: "TRN-2026-089",
      title: "Weightlifting Team to NIS Patiala High-Altitude Acclimatization",
      subtitle: "12 Lifters + 2 Physios • Mini-Van Req. - 01 Mar 2026",
      status: "Dean Sports Cleared",
      statusType: "cleared",
      sanctioned: false,
    },
    {
      id: "TRN-2026-090",
      title: "Academic Council Delegate Shuttle: Patiala to IGI Airport New Delhi",
      subtitle: "VIP Shuttle PB-11-AC-0004 • 03 Mar 2026 04:00 IST",
      status: "Under Transit Review",
      statusType: "review",
      sanctioned: false,
    },
  ]);

  const handleSanction = (id: string) => {
    setUpcomingRequests((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              sanctioned: true,
              status: "Sanctioned & Scheduled",
              statusType: "sanctioned",
            }
          : item
      )
    );
  };

  return (
    <div className="w-full rounded-[8px] border border-[#e0e7f1] bg-white p-4 sm:p-5 shadow-xs mb-6">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#f1f5f9] gap-1.5">
        <div className="flex items-center gap-2">
          {/* Trophy Icon */}
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] bg-[#fff4e5] text-[#d97706]">
            <svg
              className="w-4 h-4 text-[#ff9f2d]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1c1.94-.38 3.5-1.98 3.61-4.06C19.08 11.63 21 9.55 21 7V5h-2zm-14 2h2v3.08C5.83 9.77 5 8.94 5 7.91V7zm12 3.08V7h2v.91c0 1.03-.83 1.86-2 2.17z" />
            </svg>
          </div>
          <h2 className="font-['Inter',sans-serif] text-[14px] sm:text-[15px] font-bold text-[#102d4d]">
            FR-TRN-05: Inter-University Tournament Transit Dockets
          </h2>
        </div>

        <span className="font-['Inter',sans-serif] text-[10px] sm:text-[10.5px] font-medium text-[#596979]">
          Statutory Linkage: FR-TOUR &amp; Sports Directorate
        </span>
      </div>

      {/* MAIN ACTIVE TRIP CARD */}
      <div className="mt-4 rounded-[6px] border border-[#cbd5e1] bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]">
        {/* Title & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#f1f5f9]">
          <div className="flex items-center gap-2">
            <span className="rounded-[3px] bg-[#001229] px-2 py-1 font-mono text-[10px] font-bold text-white uppercase tracking-wider">
              {activeDocket.tripId}
            </span>
            <h3 className="font-['Public_Sans',sans-serif] text-[14px] sm:text-[15px] font-bold text-[#102d4d]">
              {activeDocket.title}
            </h3>
          </div>

          <span className="inline-flex items-center gap-1 rounded-[3px] bg-[#00664f] px-2.5 py-1 text-[10.5px] font-bold text-[#7ff0c9]">
            <svg
              className="w-3.5 h-3.5 text-[#7ff0c9]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {activeDocket.status}
          </span>
        </div>

        {/* 4-COLUMN DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 py-3.5 text-xs">
          {/* Col 1 */}
          <div>
            <span className="font-['Inter',sans-serif] text-[9.5px] font-bold uppercase tracking-wider text-[#596979] block mb-1">
              DESTINATION &amp; ROUTE
            </span>
            <p className="font-bold text-[#102d4d] text-[12.5px]">
              {activeDocket.destination}
            </p>
            <p className="text-[11px] text-[#596979] mt-0.5">
              {activeDocket.distance}
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <span className="font-['Inter',sans-serif] text-[9.5px] font-bold uppercase tracking-wider text-[#596979] block mb-1">
              SQUAD &amp; FACULTY IN-CHARGE
            </span>
            <p className="font-bold text-[#102d4d] text-[12.5px]">
              {activeDocket.squadLead}
            </p>
            <p className="text-[11px] text-[#596979] mt-0.5">
              {activeDocket.department}
            </p>
          </div>

          {/* Col 3 */}
          <div>
            <span className="font-['Inter',sans-serif] text-[9.5px] font-bold uppercase tracking-wider text-[#596979] block mb-1">
              ASSIGNED CONVEYANCE
            </span>
            <p className="font-bold text-[#102d4d] text-[12.5px]">
              {activeDocket.assignedConveyance}
            </p>
            <p className="text-[11px] text-[#596979] mt-0.5">
              {activeDocket.driver}
            </p>
          </div>

          {/* Col 4 */}
          <div>
            <span className="font-['Inter',sans-serif] text-[9.5px] font-bold uppercase tracking-wider text-[#596979] block mb-1">
              MANIFEST &amp; GEAR LOG
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#102d4d] text-[12.5px]">
                {activeDocket.athletesCount} Athletes
              </span>
              <span className="font-bold text-[#00664f] text-[11px]">
                Confirmed
              </span>
            </div>
            <p className="text-[11px] text-[#596979] mt-0.5">
              {activeDocket.gearManifest}
            </p>
          </div>
        </div>

        {/* VERIFICATION & GATE PASS ROW */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-[#f1f5f9] text-[11px] text-[#596979] gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] text-[#102d4d] font-semibold flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-[#28568f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {activeDocket.registrarSanction}
            </span>

            <span className="font-semibold text-[#00664f]">
              {activeDocket.eSignAuth}
            </span>

            <span className="text-[#64748b]">
              Dep: {activeDocket.departureTime} • Exp Ret:{" "}
              {activeDocket.expectedReturn}
            </span>
          </div>

          <button
            onClick={() => onViewGatePass(activeDocket)}
            type="button"
            className="inline-flex items-center gap-1 font-bold text-[#1b4e89] hover:text-[#0c2f59] text-[11px] underline underline-offset-2 cursor-pointer transition-colors"
          >
            View Gate Pass
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>

      {/* UPCOMING STATUTORY REQUESTS IN REVIEW */}
      <div className="mt-5">
        <h3 className="font-['Inter',sans-serif] text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#596979] mb-2.5">
          UPCOMING STATUTORY REQUESTS IN REVIEW
        </h3>

        <div className="space-y-2.5">
          {/* Dynamically added custom requisitions */}
          {customDockets.map((req) => (
            <div
              key={req.tripId}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-[6px] border border-[#d6e3fb] bg-[#f8fafc] hover:bg-[#f1f5f9] transition-all"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="rounded-[3px] bg-[#102d4d] px-2 py-1 font-mono text-[9.5px] font-bold text-white shrink-0 uppercase">
                  {req.tripId}
                </span>
                <div className="min-w-0">
                  <h4 className="font-bold text-[#102d4d] text-[12px] truncate">
                    {req.title}
                  </h4>
                  <p className="text-[10.5px] text-[#596979] mt-0.5">
                    {req.athletesCount} Athletes • {req.destination} • {req.departureTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="rounded-[3px] bg-[#e8f8f2] text-[#00664f] border border-[#a3e8cc] px-2 py-0.5 text-[10px] font-bold">
                  {req.status}
                </span>
                <button
                  onClick={() => onViewGatePass(req)}
                  type="button"
                  className="rounded-[3px] bg-[#001229] hover:bg-[#062344] px-3 py-1 font-['Inter',sans-serif] text-[10.5px] font-bold text-white transition-all cursor-pointer"
                >
                  View Docket
                </button>
              </div>
            </div>
          ))}

          {/* Preset Upcoming Requests */}
          {upcomingRequests.map((req) => (
            <div
              key={req.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-[6px] border border-[#e2e8f0] bg-white hover:bg-[#f8fafc] transition-all"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="rounded-[3px] bg-[#102d4d] px-2 py-1 font-mono text-[9.5px] font-bold text-white shrink-0">
                  {req.id}
                </span>
                <div className="min-w-0">
                  <h4 className="font-bold text-[#102d4d] text-[12px] truncate">
                    {req.title}
                  </h4>
                  <p className="text-[10.5px] text-[#596979] mt-0.5">
                    {req.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {req.statusType === "cleared" && (
                  <span className="rounded-[3px] bg-[#dce7fa] px-2 py-0.5 text-[10px] font-bold text-[#29466d]">
                    {req.status}
                  </span>
                )}
                {req.statusType === "review" && (
                  <span className="rounded-[3px] bg-[#f1f5f9] px-2 py-0.5 text-[10px] font-bold text-[#475569] border border-[#cbd5e1]">
                    {req.status}
                  </span>
                )}
                {req.statusType === "sanctioned" && (
                  <span className="rounded-[3px] bg-[#00664f] px-2 py-0.5 text-[10px] font-bold text-[#7ff0c9]">
                    ✓ {req.status}
                  </span>
                )}

                <button
                  onClick={() => handleSanction(req.id)}
                  disabled={req.sanctioned}
                  type="button"
                  className={`rounded-[3px] px-3 py-1 font-['Inter',sans-serif] text-[10.5px] font-bold transition-all cursor-pointer ${
                    req.sanctioned
                      ? "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
                      : "bg-[#001229] hover:bg-[#062344] text-white active:scale-95 shadow-xs"
                  }`}
                >
                  {req.sanctioned ? "Sanctioned" : "Sanction"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Section 5: Fleet Statutory Health (FR-TRN-01/02) ---
function FleetStatutoryHealth() {
  const records: FleetHealthRecord[] = [
    {
      regNo: "PB-11-AA-4091",
      model: "Tata LPO 1618 (42-S)",
      rtoFitnessDate: "14 Nov 2026",
      insuranceDate: "Ins: 30 Dec 26",
      odometer: "64,280 km",
      alert: "Service OK",
      alertType: "ok",
    },
    {
      regNo: "PB-11-B-2012",
      model: "Force Traveller (ALS)",
      rtoFitnessDate: "08 Aug 2026",
      insuranceDate: "Ins: 12 Jul 26",
      odometer: "31,450 km",
      alert: "Oxygen Calib.",
      alertType: "ok",
    },
    {
      regNo: "PB-11-AC-9088",
      model: "Mahindra Bolero Maxi",
      rtoFitnessDate: "22 Oct 2026",
      insuranceDate: "Ins: 15 Sep 26",
      odometer: "88,110 km",
      alert: "Brake Pad 500km",
      alertType: "warning",
    },
    {
      regNo: "PB-11-CZ-1104",
      model: "Eicher Starline (32-S)",
      rtoFitnessDate: "05 May 2026",
      insuranceDate: "Ins: 20 May 26",
      odometer: "42,900 km",
      alert: "Service OK",
      alertType: "ok",
    },
  ];

  return (
    <div className="w-full rounded-[8px] border border-[#e0e7f1] bg-white p-4 sm:p-5 shadow-xs mb-5">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-2">
          {/* Statutory Shield / Building Icon */}
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] bg-[#eef3ff] text-[#102d4d]">
            <svg
              className="w-4 h-4 text-[#102d4d]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>

          <div>
            <h2 className="font-['Inter',sans-serif] text-[13.5px] sm:text-[14.5px] font-bold text-[#102d4d]">
              FR-TRN-01/02: Fleet Statutory Health
            </h2>
          </div>
        </div>

        <span className="rounded-[3px] bg-[#dce7fa] px-2 py-0.5 font-['Inter',sans-serif] text-[10px] font-bold text-[#28568f] shrink-0 border border-[#c5d8f7]">
          18 Active Records
        </span>
      </div>

      <p className="mt-2 text-[11px] leading-snug text-[#596979]">
        Central RTO Fitness, Commercial Insurance, Pollution Certificates &amp;
        Maintenance Milestones.
      </p>

      {/* STATUTORY TABLE */}
      <div className="mt-3.5 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#e2e8f0] text-[9.5px] font-bold text-[#596979] uppercase tracking-wider bg-[#f8fafc]">
              <th className="py-2 px-2.5">VEHICLE ID / MODEL</th>
              <th className="py-2 px-2.5">RTO FITNESS</th>
              <th className="py-2 px-2.5">ODOMETER</th>
              <th className="py-2 px-2.5 text-right">PM ALERT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {records.map((r, i) => (
              <tr key={i} className="hover:bg-[#f8fafc] transition-colors">
                {/* Vehicle ID & Model */}
                <td className="py-2.5 px-2.5 whitespace-nowrap">
                  <span className="font-bold text-[#102d4d] block text-[11.5px]">
                    {r.regNo}
                  </span>
                  <span className="text-[10px] text-[#64748b] block">
                    {r.model}
                  </span>
                </td>

                {/* RTO Fitness & Ins */}
                <td className="py-2.5 px-2.5 whitespace-nowrap">
                  <span className="font-semibold text-[#102d4d] block text-[11px]">
                    {r.rtoFitnessDate}
                  </span>
                  <span className="text-[10px] text-[#64748b] block">
                    {r.insuranceDate}
                  </span>
                </td>

                {/* Odometer */}
                <td className="py-2.5 px-2.5 text-[#102d4d] font-semibold whitespace-nowrap text-[11.5px]">
                  {r.odometer}
                </td>

                {/* PM Alert Badge */}
                <td className="py-2.5 px-2.5 text-right whitespace-nowrap">
                  {r.alertType === "ok" && (
                    <span className="inline-block rounded-[3px] bg-[#e8f0ff] px-2 py-0.5 text-[10px] font-bold text-[#1b4e89] border border-[#c5d8f7]">
                      {r.alert}
                    </span>
                  )}
                  {r.alertType === "warning" && (
                    <span className="inline-block rounded-[3px] bg-[#ff9f2d] px-2 py-0.5 text-[10px] font-bold text-[#663500]">
                      {r.alert}
                    </span>
                  )}
                  {r.alertType === "urgent" && (
                    <span className="inline-block rounded-[3px] bg-[#fee2e2] px-2 py-0.5 text-[10px] font-bold text-[#b91c1c] border border-[#fca5a5]">
                      {r.alert}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER: VAAHAN SYNC STATUS */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between pt-2.5 border-t border-[#f1f5f9] text-[10.5px] text-[#596979]">
        <span className="flex items-center gap-1 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#28a978]"></span>
          RTO Punjab Vaahan API v4.2 Connected
        </span>

        <span className="flex items-center gap-1 text-[#28568f] font-semibold">
          <svg
            className="w-3 h-3 text-[#28568f]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Automated Sync 00:00 IST
        </span>
      </div>
    </div>
  );
}

// --- Section 6: Student & Commuter Routes (FR-TRN-03) ---
function StudentCommuterRoutes() {
  const routes: CommuterRoute[] = [
    {
      routeNumber: "ROUTE 01",
      routeName: "Patiala Cantt & Urban Estate",
      occupiedSeats: 41,
      totalSeats: 42,
      percentage: 98,
      vehicleReg: "Vehicle: PB-11-CZ-1104",
      passDetails: "41 Passes Active (100% SBPAY Paid)",
      statusTag: "On Time",
    },
    {
      routeNumber: "ROUTE 02",
      routeName: "Nabha Road & Polo Ground",
      occupiedSeats: 36,
      totalSeats: 42,
      percentage: 85,
      vehicleReg: "Vehicle: PB-11-AA-7712",
      passDetails: "36 Passes Active (No Defaulters)",
      statusTag: "On Time",
    },
    {
      routeNumber: "ROUTE 03",
      routeName: "Rajpura Regional Shuttle",
      occupiedSeats: 30,
      totalSeats: 32,
      percentage: 94,
      vehicleReg: "Vehicle: PB-11-AC-3101",
      passDetails: "30 Smart-Pass Card Holders",
      statusTag: "On Time",
    },
  ];

  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  return (
    <div className="w-full rounded-[8px] border border-[#e0e7f1] bg-white p-4 sm:p-5 shadow-xs mb-5">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9] gap-2">
        <div className="flex items-center gap-2">
          {/* Route Fork Icon */}
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] bg-[#eef3ff] text-[#102d4d]">
            <svg
              className="w-4 h-4 text-[#102d4d]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>

          <h2 className="font-['Inter',sans-serif] text-[13.5px] sm:text-[14.5px] font-bold text-[#102d4d]">
            FR-TRN-03: Student &amp; Commuter Routes
          </h2>
        </div>

        <span className="rounded-[3px] bg-[#dce7fa] px-2 py-0.5 font-['Inter',sans-serif] text-[10px] font-bold text-[#102d4d] shrink-0 border border-[#c5d8f7]">
          SBPAY Validated
        </span>
      </div>

      {/* ROUTES LIST */}
      <div className="mt-4 space-y-4">
        {routes.map((rt) => {
          const isSelected = selectedRoute === rt.routeNumber;
          return (
            <div
              key={rt.routeNumber}
              onClick={() => setSelectedRoute(isSelected ? null : rt.routeNumber)}
              className={`p-2.5 rounded-[6px] border transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#eef3ff] border-[#b0cbfa]"
                  : "bg-white border-transparent hover:bg-[#f8fafc] hover:border-[#e2e8f0]"
              }`}
            >
              {/* Route Title & Seats */}
              <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                <span className="font-bold text-[#102d4d] text-[12px]">
                  {rt.routeNumber} • {rt.routeName}
                </span>

                <span className="font-bold text-[#102d4d] text-[11px]">
                  {rt.occupiedSeats} / {rt.totalSeats} Seats ({rt.percentage}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-2 h-2 w-full rounded-full bg-[#e2e8f0] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#102d4d] transition-all duration-500"
                  style={{ width: `${rt.percentage}%` }}
                ></div>
              </div>

              {/* Sub-details */}
              <div className="mt-2 flex flex-wrap items-center justify-between text-[10.5px] text-[#596979]">
                <span>{rt.vehicleReg}</span>
                <span className="text-[#28568f] font-semibold">
                  {rt.passDetails}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Section 7: Driver Roster & Safety Log (FR-TRN-04) ---
function DriverRosterSafety() {
  const drivers: DriverRosterEntry[] = [
    {
      driverId: "DR-014",
      initials: "HS",
      name: "Harjit Singh (DR-014)",
      shift: "Shift: Amritsar Inter-Uni (Convoy Lead)",
      bacReading: "0.00% BAC (05:05 IST)",
      bacTime: "05:05 IST",
      licenseInfo: "HTV Lic: Valid 2028",
      statusOk: true,
    },
    {
      driverId: "DR-009",
      initials: "JS",
      name: "Jagtar Singh (DR-009)",
      shift: "Shift: Route 01 Morning Commuter",
      bacReading: "0.00% BAC (06:40 IST)",
      bacTime: "06:40 IST",
      licenseInfo: "HTV Lic: Valid 2027",
      statusOk: true,
    },
    {
      driverId: "DR-021",
      initials: "GS",
      name: "Gurpreet Singh (DR-021)",
      shift: "Shift: Ambulance / Medical Standby",
      bacReading: "0.00% BAC (07:00 IST)",
      bacTime: "07:00 IST",
      licenseInfo: "First-Aid BLS Certified Active",
      statusOk: true,
    },
  ];

  const [activeDriver, setActiveDriver] = useState<string | null>(null);

  return (
    <div className="w-full rounded-[8px] border border-[#e0e7f1] bg-white p-4 sm:p-5 shadow-xs">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9] gap-2">
        <div className="flex items-center gap-2">
          {/* Driver / Steering Icon */}
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] bg-[#eef3ff] text-[#102d4d]">
            <svg
              className="w-4 h-4 text-[#102d4d]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          <h2 className="font-['Inter',sans-serif] text-[13.5px] sm:text-[14.5px] font-bold text-[#102d4d]">
            FR-TRN-04: Driver Roster &amp; Safety Log
          </h2>
        </div>

        <span className="rounded-[3px] bg-[#00664f] px-2.5 py-1 font-['Inter',sans-serif] text-[10px] font-bold text-[#7ff0c9] shrink-0">
          100% Breathalyzer Passed
        </span>
      </div>

      {/* DRIVER LIST */}
      <div className="mt-3.5 divide-y divide-[#f1f5f9]">
        {drivers.map((d) => {
          const isSelected = activeDriver === d.driverId;
          return (
            <div
              key={d.driverId}
              onClick={() => setActiveDriver(isSelected ? null : d.driverId)}
              className={`py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors cursor-pointer rounded px-2 ${
                isSelected ? "bg-[#f8fafc]" : "hover:bg-[#fcfdfd]"
              }`}
            >
              {/* Left side: Avatar Initials + Name + Shift */}
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dce8fb] font-['Inter',sans-serif] text-[11px] font-bold text-[#102d4d] border border-[#c0d5f5]">
                  {d.initials}
                </div>

                <div className="min-w-0">
                  <h4 className="font-['Inter',sans-serif] text-[12px] font-bold text-[#102d4d] truncate">
                    {d.name}
                  </h4>
                  <p className="text-[10.5px] text-[#596979] truncate mt-0.5">
                    {d.shift}
                  </p>
                </div>
              </div>

              {/* Right side: Breathalyzer check + License */}
              <div className="flex sm:flex-col sm:items-end justify-between text-right shrink-0 gap-0.5 pl-10 sm:pl-0">
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#00664f]">
                  <svg
                    className="w-3.5 h-3.5 text-[#28a978]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{d.bacReading}</span>
                </div>

                <span className="text-[10px] text-[#64748b]">
                  {d.licenseInfo}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 4. MAIN TRANSPORT PAGE EXPORT
// ==========================================
export default function TransportPage() {
  // Modal states
  const [isRequisitionOpen, setIsRequisitionOpen] = useState(false);
  const [isLogMaintenanceOpen, setIsLogMaintenanceOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isGatePassOpen, setIsGatePassOpen] = useState(false);

  // Selected Gate Pass docket for viewing
  const [selectedGatePassDocket, setSelectedGatePassDocket] =
    useState<TournamentDocket | null>(null);

  // Dynamic user-submitted requisitions
  const [customRequisitions, setCustomRequisitions] = useState<TournamentDocket[]>([]);

  // Active Broadcasts ticker/banner
  const [activeBroadcast, setActiveBroadcast] = useState<ActiveBroadcast | null>(null);

  // Toast feedback message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Handlers
  const handleCreateRequisition = (newDocket: TournamentDocket) => {
    setCustomRequisitions((prev) => [newDocket, ...prev]);
    triggerToast(
      `✓ Requisition ${newDocket.tripId} submitted to Sports Directorate for review.`
    );
  };

  const handleLogMaintenance = (log: {
    vehicle: string;
    type: string;
    amount: string;
    odometer: string;
  }) => {
    triggerToast(
      `✓ ${log.type} of ₹${log.amount} recorded for ${log.vehicle} (Odo: ${log.odometer} km). Vaahan Synced.`
    );
  };

  const handleDispatchBroadcast = (broadcast: ActiveBroadcast) => {
    setActiveBroadcast(broadcast);
    triggerToast(
      `📢 Live Broadcast transmitted to ${broadcast.route} via SMS & Telematics Push.`
    );
  };

  const handleViewGatePass = (docket: TournamentDocket) => {
    setSelectedGatePassDocket(docket);
    setIsGatePassOpen(true);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 py-2">
      {/* TOAST NOTIFICATION POPUP */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 rounded-lg bg-[#001229] text-white px-4 py-3 shadow-2xl border border-[#28568f] text-xs font-semibold animate-slideDown">
          <span className="w-2 h-2 rounded-full bg-[#7ff0c9] animate-pulse"></span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-gray-400 hover:text-white p-0.5 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* DISPATCH BROADCAST LIVE ALERT BANNER */}
      {activeBroadcast && (
        <div className="w-full mb-4 p-3.5 rounded-lg bg-[#fff1f0] border border-[#ffa39e] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff4d4f] text-white font-bold text-xs animate-bounce">
              !
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#cf1322] uppercase tracking-wide">
                  LIVE BROADCAST ({activeBroadcast.priority} PRIORITY) • {activeBroadcast.timestamp}
                </span>
                <span className="rounded bg-[#ffe58f] px-1.5 py-0.2 text-[10px] font-bold text-[#874d00]">
                  {activeBroadcast.route}
                </span>
              </div>
              <h4 className="font-bold text-[#102d4d] text-[13px] mt-0.5">
                {activeBroadcast.title}
              </h4>
              <p className="text-[#596979] mt-0.5">{activeBroadcast.message}</p>
            </div>
          </div>

          <button
            onClick={() => setActiveBroadcast(null)}
            type="button"
            className="self-end sm:self-center px-3 py-1 rounded bg-white text-[#cf1322] border border-[#ffa39e] hover:bg-[#fff1f0] font-bold text-[11px] shrink-0 transition-colors cursor-pointer"
          >
            Dismiss Broadcast
          </button>
        </div>
      )}

      {/* 1. TOP HEADER WITH STATUTORY BADGES & ACTIONS */}
      <TransportHeader
        onOpenRequisition={() => setIsRequisitionOpen(true)}
        onOpenLogMaintenance={() => setIsLogMaintenanceOpen(true)}
        onOpenBroadcast={() => setIsBroadcastOpen(true)}
      />

      {/* 2. TOP 4 METRIC CARDS */}
      <TransportMetricCards />

      {/* 3. MAIN TWO-COLUMN RESPONSIVE LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start w-full">
        {/* LEFT COLUMN: LIVE GPS RADAR & TOURNAMENT TRANSIT DOCKETS */}
        <div className="w-full lg:w-[60%] xl:w-[62%] min-w-0">
          {/* FR-TRN-04: Live GPS Fleet Telematics Radar */}
          <LiveGpsRadar />

          {/* FR-TRN-05: Inter-University Tournament Transit Dockets */}
          <TournamentTransitDockets
            onViewGatePass={handleViewGatePass}
            customDockets={customRequisitions}
          />
        </div>

        {/* RIGHT COLUMN: FLEET HEALTH, COMMUTER ROUTES & DRIVER ROSTER */}
        <div className="w-full lg:w-[40%] xl:w-[38%] min-w-0">
          {/* FR-TRN-01/02: Fleet Statutory Health */}
          <FleetStatutoryHealth />

          {/* FR-TRN-03: Student & Commuter Routes */}
          <StudentCommuterRoutes />

          {/* FR-TRN-04: Driver Roster & Safety Log */}
          <DriverRosterSafety />
        </div>
      </div>

      {/* MODALS */}
      {/* 1. Requisition Tournament Bus Modal */}
      <RequisitionModal
        isOpen={isRequisitionOpen}
        onClose={() => setIsRequisitionOpen(false)}
        onSubmit={handleCreateRequisition}
      />

      {/* 2. Log Maintenance / Fuel Modal */}
      <LogMaintenanceModal
        isOpen={isLogMaintenanceOpen}
        onClose={() => setIsLogMaintenanceOpen(false)}
        onSubmit={handleLogMaintenance}
      />

      {/* 3. Dispatch Route Broadcast Modal */}
      <DispatchBroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        onSubmit={handleDispatchBroadcast}
      />

      {/* 4. Digital Gate Pass Modal */}
      {selectedGatePassDocket && (
        <GatePassModal
          isOpen={isGatePassOpen}
          onClose={() => setIsGatePassOpen(false)}
          docket={selectedGatePassDocket}
        />
      )}
    </div>
  );
}
