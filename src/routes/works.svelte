<script>
import {supabase} from "$lib/supabase"
let tech;
let project;

async function getData() {
    const works = await supabase
        .from('Works')
        .select('*')

    const data = [];

        for (const worksid in works.data) {
            tech = await supabase
            .from('Project')
            .select('tech_stack_id (name)')
            .eq('work_id', works.data[worksid].id)
            
            
            data.push([works.data[worksid], tech.body])
        }
        

    return data
}
</script>
<div class="font-mono pl-28 pt-4 lg:pt-0 dark:bg-slate-800 text-gray-300 w-screen min-h-screen mb-0 items-center">
    <h1 class="font-bold text-xl text-center underline lg:text-2xl">Works</h1>
    <div class="flex flex-col lg:flex-row lg:flex-wrap lg:justify-center mt-10">
        {#await getData()}
        <p>Loading ...</p>
        {:then data}
        {#each data as data}
        <div class="w-full lg:w-1/3 h-52 bg-white mr-5 mb-3">
            <a href={data[0].link_project} target="_blank">
                <div class="bg-slate-800 h-full w-full relative border-2 cursor-pointer hover:transition-all duration-100 hover:-translate-y-3 hover:scale-105 shadow hover:-rotate-2">
                    <div class="p-6">
                        <h2 class="text-lg font-bold underline pb-1">{data[0].project_name}</h2>
                        <p class="tracking-wide mb-2">{data[0].description}</p>
                        <div class="flex flex-row mt-3 lg:justify-end justify-center">
                        {#each data[1] as techstack } 
                            <p class="mr-2">#{techstack.tech_stack_id.name}</p>
                            {/each}
                        </div>
                        <a href={data[0].repository} target="_blank" class="pt-3 block hover:underline">Repository <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="inline" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.9989871,1 C5.92550416,1 1,5.92482888 1,12.0003376 C1,16.8603395 4.15153934,20.9829338 8.52263728,22.4374904 C9.0729918,22.5387827 9.27355045,22.199116 9.27355045,21.9073943 C9.27355045,21.6467356 9.2640965,20.954572 9.25869425,20.0368642 C6.19899322,20.7013414 5.55342398,18.5620492 5.55342398,18.5620492 C5.0530403,17.2911692 4.33183953,16.9528531 4.33183953,16.9528531 C3.33309801,16.2708186 4.40747107,16.2843243 4.40747107,16.2843243 C5.51155652,16.3619816 6.09229872,17.4181221 6.09229872,17.4181221 C7.07348292,19.0988981 8.66714755,18.6133706 9.2938089,18.3317781 C9.39375058,17.6213819 9.67804414,17.1365297 9.99205009,16.86169 C7.54955646,16.5841493 4.98146045,15.6401056 4.98146045,11.4249977 C4.98146045,10.224347 5.41026428,9.24181221 6.11390773,8.47334172 C6.00046042,8.19512569 5.62297799,7.07618404 6.22195279,5.56220265 C6.22195279,5.56220265 7.14506277,5.26642929 9.24653918,6.68992296 C10.12373,6.44547101 11.0650726,6.32392032 12.0003376,6.31919335 C12.9349274,6.32392032 13.8755947,6.44547101 14.7541361,6.68992296 C16.8542619,5.26642929 17.7760214,5.56220265 17.7760214,5.56220265 C18.3763467,7.07618404 17.9988643,8.19512569 17.8860923,8.47334172 C18.5910863,9.24181221 19.0165137,10.224347 19.0165137,11.4249977 C19.0165137,15.6509101 16.444366,16.5807729 13.9944443,16.8529114 C14.3888087,17.192578 14.7406305,17.863808 14.7406305,18.890236 C14.7406305,20.3603241 14.7271248,21.5467939 14.7271248,21.9073943 C14.7271248,22.2018171 14.9256576,22.5441849 15.4834403,22.4368151 C19.8511618,20.9788821 23,16.8589889 23,12.0003376 C23,5.92482888 18.0744958,1 11.9989871,1"></path></svg></a>
                    </div>
                </div>
            </a>
        </div>
        {/each}
        {/await}
    </div>
</div>
