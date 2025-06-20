import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Shift } from '../../../components/Shift';
import { useData } from "../../../DataContext";

export const Shifts: React.FC = () => {
    const { branch, dayIndex } = useParams();
    const data = useData();
    const shift_types = data.inputData?.shift_types || [];

    return (
        <div>
            <div className='mb-16'>
                <h1>Nurses Shifts</h1>
            </div>
            <div className="flex items-center justify-center flex-row flex-wrap m-4 gap-4">
                {shift_types.map((shiftType: string) => (
                    <Link
                        key={shiftType}
                        to={`/${branch}/Options/Calendar/${dayIndex}/Shifts/${shiftType}/NursesList`}
                    >
                        <Shift shiftType={shiftType as 'early' | 'late' | 'night'}>
                            {`${shiftType.charAt(0).toUpperCase()}${shiftType.slice(1)} Shift`}
                        </Shift>
                    </Link>
                ))}
            </div>
        </div>
    );
};