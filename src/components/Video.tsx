import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from "phosphor-react";

import '@vime/core/themes/default.css';
import { useGetLessonBySlugQuery } from "../graphql/generated";


interface VideoProps {
    lessonSlug: string;
}

export function Video(props: VideoProps){
    const { data } = useGetLessonBySlugQuery({
        variables: {
            slug: props.lessonSlug,
        }
    });

    if (!data || !data.lesson) {
        return (
            <div className="flex-1 grid place-content-center">
                <p className="text-2xl text-blue-500">
                    Carregando...
                </p>
            </div>
        );
    }

    return (
        <div className="pb-16 flex-1">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[68.75rem] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube videoId={data.lesson.videoId} key={data.lesson.videoId} />
                        <DefaultUi />
                    </Player>
                </div>
            </div>

            <div className="p-8 w-full lg:max-w-[68.75rem] lg:mx-auto">
                <div className="flex flex-col items-start gap-10 md:flex-row md:gap-16">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {data.lesson.title}
                        </h1>
                        <p  className="mt-4 text-gray-200 leading-relaxed">
                            {data.lesson.description}
                        </p>

                        {data.lesson.teacher && (
                            <a
                                href="https://github.com/rhyanpinto"
                                target="_blank"
                                className="flex items-center gap-4 mt-6"
                            >
                                <img 
                                    className="h-16 w-16 rounded-full border-2 border-blue-500" 
                                    src={data.lesson.teacher.avatarURL}
                                    alt="Foto de perfil" 
                                />
                                <div className="leading-relaxed">
                                    <strong className="font-bold text-xl lg:text-2xl block hover:text-blue-500">
                                        {data.lesson.teacher.name}
                                    </strong>
                                    <span className="text-gray-200 text-sm block">
                                        {data.lesson.teacher.bio}
                                    </span>
                                </div>
                            </a>
                        )}
                    </div>
                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <a href="" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
                            <DiscordLogo size={24} />
                            Comunidade do Discord
                        </a>

                        <a href="" className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors">
                            <Lightning size={24} />
                            Acesse o desafio
                        </a>
                    </div>
                </div>
                <div className="gap-8 mt-20 grid grid-cols-1 xl:grid-cols-2">
                    <a 
                        href="https://github.com/rhyanpinto" 
                        className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-2 lg:gap-6 justify-between hover:bg-gray-600 transition-colors"
                    >
                        <div className="bg-green-700 h-full p-2 lg:p-6 flex items-center">
                            <FileArrowDown size={40}/>
                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">
                                Material Complementar
                            </strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Acesse o material complementar para acelerar o seu desenvolvimento.
                            </p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>

                    <a 
                        href="https://github.com/rhyanpinto" 
                        className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-2 lg:gap-6 justify-between hover:bg-gray-600 transition-colors"
                    >
                        <div className="bg-green-700 h-full p-2 lg:p-6 flex items-center">
                            <Image size={40}/>
                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-lg lg:text-2xl">
                                Wallpapers exclusivos
                            </strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua m??quina.
                            </p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}