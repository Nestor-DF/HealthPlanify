import React, { useState } from 'react';
import { useData } from '../../../DataContext';
import { PatientFullData } from '../../../types/Combined';

interface PatientDetailProps {
    patientId: string;
}

export const PatientDetail: React.FC<PatientDetailProps> = ({ patientId }) => {
    const { inputData, solutionData } = useData();
    const [isOpen, setIsOpen] = useState<boolean>(true);

    if (!inputData || !solutionData) {
        return <div>Ups, something went wrong! There is no loaded data</div>;
    }

    const patientSolution = solutionData.patients.find((p) => p.id === patientId)!;
    const patientInput = inputData.patients.find((pi) => pi.id === patientId)!;
    const patientFull: PatientFullData = { ...patientSolution, ...patientInput };

    const toggleDetails = () => setIsOpen(prev => !prev);

    return (
        <div className='border rounded p-4'>
            <div className='flex justify-between items-center mb-2'>
                <h3 className='text-center'>{patientId} Details</h3>
                <button
                    onClick={toggleDetails}
                    className="
                        px-2 py-1
                        text-sm
                        rounded
                        cursor-pointer

                        transition-all duration-200 ease-in-out
                        hover:font-bold
                    "
                >
                    {isOpen ? 'Hide' : 'Show'}
                </button>
            </div>

            {isOpen && (
                <div className='flex flex-col gap-2'>
                    <p className='text-left'><strong>Admission Day:</strong> {patientFull.admission_day}</p>
                    <p className='text-left'><strong>Room:</strong> {patientFull.room}</p>
                    <p className='text-left'><strong>Operating Theater:</strong> {patientFull.operating_theater}</p>
                    <p className='text-left'><strong>Mandatory:</strong> {patientFull.mandatory ? 'Yes' : 'No'}</p>
                    <p className='text-left'><strong>Gender:</strong> {patientFull.gender}</p>
                    <p className='text-left'><strong>Age Group:</strong> {patientFull.age_group}</p>
                    <p className='text-left'><strong>Length of Stay:</strong> {patientFull.length_of_stay}</p>
                    <p className='text-left'><strong>Surgery Release Day:</strong> {patientFull.surgery_release_day}</p>
                    <p className='text-left'><strong>Surgery Due Day:</strong> {patientFull.surgery_due_day}</p>
                    <p className='text-left'><strong>Surgery Duration:</strong> {patientFull.surgery_duration}</p>
                    <p className='text-left'><strong>Surgeon ID:</strong> {patientFull.surgeon_id}</p>
                    <p className='text-left'><strong>Incompatible Room IDs:</strong> {patientFull.incompatible_room_ids.join(', ')}</p>
                </div>
            )}
        </div>
    );
};