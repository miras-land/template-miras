const targets = [
    'x86_64-unknown-linux-gnu',
    'x86_64-pc-windows-msvc',
    'x86_64-apple-darwin',
    'aarch64-apple-darwin',
    'aarch64-unknown-linux-gnu',
]

const script = 'bootstrap/app.ts'

for (const target of targets)
{
    console.log(`Compiling for ${ target }...`, Deno.cwd())

    const command = new Deno.Command('deno', {
        args: [ 'compile', '--target', target, '--include', 'app/worker/worker.ts', '--output', `.outputs/${ target }`, script ],
        stdout: 'inherit',
        stderr: 'inherit',
    })

    const status = command.outputSync()

    if (status.success)
    {
        console.log(`Successfully compiled for ${ target }`)
    }
    else
    {
        console.error(`Failed to compile for ${ target }`)
    }
}

console.log('Compilation completed for all targets.')
