import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TestCaseResult {
  id: string;
  name: string;
  score: number;
  passed: boolean;
}

interface ExperimentRunCardProps {
  experimentName: string;
  testCaseResults: TestCaseResult[];
}

export default function ExperimentRunCard({
  experimentName,
  testCaseResults,
}: ExperimentRunCardProps) {
  const passedTestCases = testCaseResults.filter((tc) => tc.passed).length;
  const totalTestCases = testCaseResults.length;
  const passRate = (passedTestCases / totalTestCases) * 100;
  const averageScore =
    testCaseResults.reduce((sum, tc) => sum + tc.score, 0) / totalTestCases;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{experimentName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Test Cases Passed</p>
            <p className="text-2xl font-bold">
              {passedTestCases} / {totalTestCases}
            </p>
            <Progress value={passRate} className="mt-2" />
          </div>
          <div>
            <p className="text-sm font-medium">Average Score</p>
            <p className="text-2xl font-bold">{averageScore.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">
              Individual Test Case Results
            </p>
            <ul className="space-y-2">
              {testCaseResults.map((tc) => (
                <li key={tc.id} className="flex justify-between items-center">
                  <span className="text-sm">{tc.name}</span>
                  <span
                    className={`text-sm font-medium ${
                      tc.passed ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tc.score.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
