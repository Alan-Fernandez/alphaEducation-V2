import React, {  useState, ChangeEvent } from 'react';

type FormData = {
    teacher_class: string;
};


type CourseFormProps = {
    formData: FormData;
    handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    titleName: string;
};

const CourseForm = ({formData, handleChange, titleName }: CourseFormProps) => {
const [cursoOptions, setCursoOptions] = useState(''); // Estado para almacenar la opción seleccionada de Turma
const [selectedTurma, setSelectedTurma]  = useState<string[]>([]); // Estado para almacenar las opciones de estado civil

const handleChangeTurma = (event: ChangeEvent<HTMLSelectElement>) => {
const turma = event.target.value;
setCursoOptions(turma); // Actualiza el estado de Turma

// Define las opciones de estado civil basadas en la selección de Turma
switch (turma) {
    case 'ensInf':
    setSelectedTurma([
        '1AI',
        '2AI',
        '3AI',
    ]);
    break;
    case 'ensFund':
    setSelectedTurma([
        '1AF',
        '2AF',
        '3AF',
        '4AF',
        '5AF',
        '6AF',
        '7AF',
        '8AF',
        '9AF',
    ]);
    break;
    case 'ensMedio':
    setSelectedTurma([
        '1AM',
        '1BM',
        '2AM',
        '3AM',
    ]);
    break;
    case 'PV':
    setSelectedTurma(['EXT']);
    break;
    default:
    setSelectedTurma([]);
}
};

return (
    <div
        className="flex-col pb-3"
    >
        <h2
            className="text-xl font-bold text-gray-700 dark:text-gray-200 capitalize text-center my-4"
        >
            {titleName}
        </h2>
        <div className='flex items-center gap-6 justify-evenly'>
            <div className='w-full'>
                <label
                    className="text-black dark:text-gray-200 text-md"
                    htmlFor="curso"
                >
                    Curso:
                </label>
                <select
                    id="curso"
                    name="curso"
                    className="w-full px-4 py-2 mt-2 font-medium text-gray-500 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-gray-600 rounded-xl"
                    onChange={handleChangeTurma}
                    value={cursoOptions}
                >
                    <option value="">Selecione um Curso</option>
                    <option value="ensInf">Ensino Infantil</option>
                    <option value="ensFund">Ensino Fundamental</option>
                    <option value="ensMedio">Ensino Médio</option>
                    <option value="PV">Pré-Vestibular</option>
                </select>
            </div>
            <div className='w-full'>
                <label
                    className="text-black dark:text-gray-200 text-md"
                    htmlFor="teacher_class"
                >
                    Turma:
                </label>
                <select
                    id="teacher_class"
                    name="teacher_class"
                    className="w-full px-4 py-2 mt-2 font-medium text-gray-500 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-gray-600 rounded-xl"
                    value={formData.teacher_class}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione uma Turma</option>
                    {selectedTurma?.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    </div>
    );
    };


export default CourseForm;





















// import React from 'react'

// const CourseForm = () => {
//   return (
//     <div>
//         <div>CourseForm</div>
//         <div>
//           <label htmlFor="curso">Estado Civil:</label>
//           <select
//             id="curso"
//             name="curso"
//             onChange={handleChange}
//             value={formData.curso}
//             required
//           >
//             {
//               dataCurso.map((curso) => (
//                 <option key={curso.id} value={curso.id}>{curso.name}</option>
//               ))
//             }
//           </select>
//           {errorMessages.curso && <p style={{ color: 'red' }}>{errorMessages.curso}</p>}
//         </div>
//     </div>
//   )
// }

// export default CourseForm