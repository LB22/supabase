import { ModalProps } from '@ui/components/Modal/Modal'
import { snakeCase } from 'lodash'
import { useSqlEditorStateSnapshot } from 'state/sql-editor'
import { CodeBlock, Modal, Separator, Tabs, TabsProvider } from 'ui'
import { generateMigrationImportCommand, generateSeedImportCommand } from './SQLEditor.utils'

export interface ImportSnippetModalProps extends ModalProps {
  id: string
}

const ImportSnippetModal = ({ id, ...props }: ImportSnippetModalProps) => {
  const snap = useSqlEditorStateSnapshot()
  const snippet = snap.snippets[id].snippet
  const migrationName = snakeCase(snippet.name)

  return (
    <Modal size="xlarge" header="Import snippet locally" hideFooter closable {...props}>
      <TabsProvider>
        <div className="flex flex-col items-start justify-between gap-4 px-6 py-3">
          <p className="text-sm mt-2">
            You can import this snippet as a local{' '}
            <a
              className="text-brand"
              href="https://supabase.com/docs/guides/cli/local-development#database-migrations"
              target="_blank"
              rel="noopener"
            >
              migration
            </a>{' '}
            or{' '}
            <a
              className="text-brand"
              href="https://supabase.com/docs/guides/cli/local-development#add-sample-data"
              target="_blank"
              rel="noopener"
            >
              seed
            </a>
            . Make sure you have the{' '}
            <a
              className="text-brand"
              href="https://supabase.com/docs/guides/cli/getting-started"
              target="_blank"
              rel="noopener"
            >
              Supabase CLI
            </a>{' '}
            installed.
          </p>
          <Separator />
          <div className="flex flex-col gap-2 my-2 w-full">
            <h2 className="text-lg">Import as migration</h2>
            <p className="text-sm text-scale-1000">
              Import the snippet as a new migration named{' '}
              <CodeBlock language="bash">{migrationName}</CodeBlock>:
            </p>
            <Tabs type="underlined">
              <Tabs.Panel id="default" label="Default">
                <CodeBlock
                  language="bash"
                  className="language-bash prose dark:prose-dark max-w-none"
                >
                  {generateMigrationImportCommand(id, migrationName)}
                </CodeBlock>
              </Tabs.Panel>
              <Tabs.Panel id="npx" label="npx">
                <pre>
                  <CodeBlock
                    language="bash"
                    className="language-bash prose dark:prose-dark max-w-none"
                  >
                    {generateMigrationImportCommand(id, migrationName, true)}
                  </CodeBlock>
                </pre>
              </Tabs.Panel>
            </Tabs>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 my-2 w-full">
            <h2 className="text-lg">Import as seed</h2>
            <p className="text-sm text-scale-1000">
              Append the snippet to the end of{' '}
              <CodeBlock language="bash">supabase/seed.sql</CodeBlock>:
            </p>
            <Tabs type="underlined">
              <Tabs.Panel id="default" label="Default">
                <CodeBlock
                  language="bash"
                  className="language-bash prose dark:prose-dark max-w-none"
                >
                  {generateSeedImportCommand(id)}
                </CodeBlock>
              </Tabs.Panel>
              <Tabs.Panel id="npx" label="npx">
                <CodeBlock
                  language="bash"
                  className="language-bash prose dark:prose-dark max-w-none"
                >
                  {generateSeedImportCommand(id, true)}
                </CodeBlock>
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </TabsProvider>
    </Modal>
  )
}

export default ImportSnippetModal
